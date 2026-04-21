import type { APIRoute } from "astro";
import { Resend } from "resend";

export const prerender = false;

const resend = new Resend(import.meta.env.RESEND_API_KEY);

const FROM_MAP: Record<string, string> = {
	portfolio: "contact@charlymech.com",
	app: "noreply@charlymech.com",
};

export const POST: APIRoute = async ({ request }) => {
	let body: {
		name?: string;
		email?: string;
		subject?: string;
		message?: string;
		company?: string;
		project?: string;
	};

	try {
		body = await request.json();
	} catch {
		return new Response(null, { status: 400 });
	}

	const {
		name,
		email,
		subject,
		message,
		company,
		project = "portfolio",
	} = body;

	if (company) return new Response(null, { status: 400 });
	if (!email || !message) return new Response(null, { status: 400 });

	const from = FROM_MAP[project] ?? FROM_MAP.portfolio;

	const { error } = await resend.emails.send({
		from: `Contact Form <${from}>`,
		to: "contact@charlymech.com",
		replyTo: email,
		subject: subject || `New message from ${name || email}`,
		text: `From: ${name || "Unknown"} <${email}>\n\n${message}`,
	});

	if (error) {
		console.error("[resend]", error);
		return new Response(null, { status: 500 });
	}

	return new Response(null, { status: 200 });
};
