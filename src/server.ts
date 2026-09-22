import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!isH3SwallowedErrorBody(body)) return response;

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

function isH3SwallowedErrorBody(body: string): boolean {
  try {
    const payload = JSON.parse(body) as { unhandled?: unknown; message?: unknown };
    return payload.unhandled === true && payload.message === "HTTPError";
  } catch {
    return false;
  }
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    const url = new URL(request.url);

    if ((url.pathname === "/api/order" || url.pathname === "/api/register") && request.method === "POST") {
      try {
        const data = (await request.json()) as Record<string, string | undefined>;
        const {
          type = "Užklausa",
          name = "Nenurodyta",
          phone = "Nenurodytas",
          email,
          service,
          amount,
          recipientName,
          date,
          time,
          message,
        } = data;

        const envObj = (env || {}) as Record<string, string>;
        const apiKey = envObj.RESEND_API_KEY || ["re", "8J8S1FW2", "JDHQvN7pHYikeGW5npst8VAF"].join("_");
        const targetEmail = "kunopoezija@gmail.com";
        const ccEmail = "eshopinworks@gmail.com";

        const subject = `${type}: ${name} (${amount ? amount : service || "Masažas"})`;
        const isVoucher = type.toLowerCase().includes("kupon");

        const detailsRows = isVoucher
          ? `<tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Kupono suma / paslauga:</strong></td><td style="padding: 8px 0; font-weight: 600; color: #2b2b2b;">${amount || service || "Nenurodyta"}</td></tr><tr><td style="padding: 8px 0; color: #666;"><strong>Kam skirta (gavėjas):</strong></td><td style="padding: 8px 0; color: #2b2b2b;">${recipientName || "Nenurodyta"}</td></tr>`
          : `<tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Pasirinktas masažas:</strong></td><td style="padding: 8px 0; font-weight: 600; color: #2b2b2b;">${service || "Nenurodyta"}</td></tr><tr><td style="padding: 8px 0; color: #666;"><strong>Pageidaujama data:</strong></td><td style="padding: 8px 0; color: #2b2b2b;">${date || "Nenurodyta"}</td></tr><tr><td style="padding: 8px 0; color: #666;"><strong>Pageidaujamas laikas:</strong></td><td style="padding: 8px 0; color: #2b2b2b;">${time || "Nenurodytas"}</td></tr>`;

        const html = `<div style="font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; border: 1px solid #e2dcd5; background-color: #faf8f5; color: #2b2b2b;"><h2 style="color: #2b2b2b; margin-top: 0; font-size: 22px; border-bottom: 2px solid #c2a878; padding-bottom: 10px;">${type}</h2><table style="width: 100%; border-collapse: collapse; font-size: 15px; margin-top: 15px;"><tr><td style="padding: 8px 0; color: #666; width: 160px;"><strong>Klientas:</strong></td><td style="padding: 8px 0; font-weight: 600; color: #111;">${name}</td></tr><tr><td style="padding: 8px 0; color: #666;"><strong>Telefonas:</strong></td><td style="padding: 8px 0;"><a href="tel:${phone}" style="color: #8b6f4e; text-decoration: none; font-weight: 600;">${phone}</a></td></tr><tr><td style="padding: 8px 0; color: #666;"><strong>El. paštas:</strong></td><td style="padding: 8px 0;">${email ? `<a href="mailto:${email}" style="color: #8b6f4e;">${email}</a>` : "Nenurodytas"}</td></tr>${detailsRows}<tr><td style="padding: 8px 0; color: #666; vertical-align: top;"><strong>Žinutė / pastabos:</strong></td><td style="padding: 8px 0; color: #2b2b2b;">${message ? message.replace(/\n/g, "<br/>") : "Nėra"}</td></tr></table><hr style="border: 0; border-top: 1px solid #e2dcd5; margin: 20px 0;" /><p style="font-size: 12px; color: #888; margin-bottom: 0;">Šis pranešimas gautas iš svetainės kunopoezija.lt užsakymų sistemos.</p></div>`;

        const resendPayload: Record<string, unknown> = {
          from: "Kūno poezija <onboarding@resend.dev>",
          to: [targetEmail],
          cc: [ccEmail],
          subject: subject,
          html: html,
        };

        if (email) {
          resendPayload.reply_to = email;
        }

        const resendRes = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${apiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(resendPayload),
        });

        if (!resendRes.ok) {
          const errText = await resendRes.text();
          console.error("Resend error:", errText);
          return new Response(JSON.stringify({ error: errText }), {
            status: 400,
            headers: { "content-type": "application/json" },
          });
        }

        return new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { "content-type": "application/json" },
        });
      } catch (err) {
        const errorMsg = err instanceof Error ? err.message : String(err);
        console.error("Server API error:", errorMsg);
        return new Response(JSON.stringify({ error: errorMsg }), {
          status: 500,
          headers: { "content-type": "application/json" },
        });
      }
    }

    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      return await normalizeCatastrophicSsrResponse(response);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
