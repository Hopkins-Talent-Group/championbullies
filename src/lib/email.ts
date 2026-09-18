// lib/email.ts

import nodemailer from "nodemailer";
import { google } from "googleapis";

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

// --------------------------------------------------------------
// Shared transporter — created fresh per send so the access token
// is always current (Google rotates them hourly).
// --------------------------------------------------------------
async function getTransporter() {
  const accessTokenResponse = await oauth2Client.getAccessToken();
  const accessToken = accessTokenResponse?.token;

  if (!accessToken) {
    throw new Error("Failed to obtain Google access token");
  }

  return nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.GOOGLE_USER,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken,
    },
  });
}

// --------------------------------------------------------------
// 1. Owner notification — full reservation details
// --------------------------------------------------------------
export async function sendOwnerNotification(payload: {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  homeType: string;
  hasYard: boolean | null;
  otherPets?: string;
  childrenAges?: string;
  hoursAlone?: string;
  puppyName?: string;
  breed?: string;
  price?: string;
  reference: string;
}) {
  const transporter = await getTransporter();
  const owner = process.env.OWNER_EMAIL ?? process.env.GOOGLE_USER;
  const fullName = `${payload.firstName} ${payload.lastName}`.trim();

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; color: #171717; line-height: 1.5;">
      <h2 style="margin: 0 0 4px;">New Reservation</h2>
      <p style="color: #6b6b6b; margin: 0 0 21px;">
        Reference <strong style="color: #d80027;">${payload.reference}</strong>
      </p>

      <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
        <tr><td style="padding: 8px 0; color: #6b6b6b; width: 40%;">Puppy</td><td style="padding: 8px 0; font-weight: 600;">${payload.puppyName ?? "—"}${payload.breed ? ` · ${payload.breed}` : ""}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Price</td><td style="padding: 8px 0;">${payload.price ?? "—"}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Name</td><td style="padding: 8px 0; font-weight: 600;">${fullName}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Email</td><td style="padding: 8px 0;"><a href="mailto:${payload.email}" style="color: #d80027;">${payload.email}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Phone</td><td style="padding: 8px 0;"><a href="tel:${payload.phone}" style="color: #d80027;">${payload.phone}</a></td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Home</td><td style="padding: 8px 0;">${payload.homeType}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Yard</td><td style="padding: 8px 0;">${payload.hasYard === null ? "—" : payload.hasYard ? "Yes" : "No"}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Other pets</td><td style="padding: 8px 0;">${payload.otherPets || "None"}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Children</td><td style="padding: 8px 0;">${payload.childrenAges || "None"}</td></tr>
        <tr><td style="padding: 8px 0; color: #6b6b6b;">Hours alone</td><td style="padding: 8px 0;">${payload.hoursAlone || "—"}</td></tr>
      </table>

      <p style="margin-top: 21px; padding-top: 13px; border-top: 1px solid #e2e2e2; color: #6b6b6b; font-size: 13px;">
        Reply to this email to reach the client directly, or send the payment link manually.
      </p>
    </div>
  `;

  const text = `New Reservation — ${payload.reference}

Puppy: ${payload.puppyName ?? "—"}${payload.breed ? ` · ${payload.breed}` : ""}
Price: ${payload.price ?? "—"}
Name: ${fullName}
Email: ${payload.email}
Phone: ${payload.phone}
Home: ${payload.homeType}
Yard: ${payload.hasYard === null ? "—" : payload.hasYard ? "Yes" : "No"}
Other pets: ${payload.otherPets || "None"}
Children: ${payload.childrenAges || "None"}
Hours alone: ${payload.hoursAlone || "—"}

Reply to this email to reach the client directly.
`;

  await transporter.sendMail({
    from: `"ChampionBullies" <${process.env.GOOGLE_USER}>`,
    to: owner,
    replyTo: payload.email,
    subject: `New Reservation — ${fullName} (${payload.reference})`,
    text,
    html,
  });
}

// --------------------------------------------------------------
// 2. Client confirmation — reference + what happens next
// --------------------------------------------------------------
export async function sendClientConfirmation(payload: {
  firstName: string;
  email: string;
  puppyName?: string;
  price?: string;
  reference: string;
}) {
  const transporter = await getTransporter();
  const puppyLabel = payload.puppyName ?? "the puppy";

  const html = `
    <div style="font-family: system-ui, -apple-system, sans-serif; max-width: 600px; color: #171717; line-height: 1.6;">
      <h2 style="margin: 0 0 8px;">Hi ${payload.firstName},</h2>
      <p style="color: #4a4a4a; margin: 0 0 21px;">
        We received your reservation request for <strong>${puppyLabel}</strong>.
      </p>

      <div style="background: #efefef; border-radius: 5px; padding: 13px 21px; margin-bottom: 21px;">
        <p style="margin: 0; font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase; color: #6b6b6b;">
          Your reference
        </p>
        <p style="margin: 5px 0 0; font-family: Georgia, serif; font-size: 21px; font-weight: 600; color: #d80027;">
          ${payload.reference}
        </p>
      </div>

      <p style="color: #4a4a4a; margin: 0 0 13px;"><strong>What happens next:</strong></p>
      <ol style="color: #4a4a4a; padding-left: 21px; margin: 0 0 21px;">
        <li style="margin-bottom: 8px;">We review your reservation details.</li>
        <li style="margin-bottom: 8px;">You'll receive payment instructions by email within one business day.</li>
        <li>A $500 deposit holds ${puppyLabel} and comes off the price.</li>
      </ol>

      <p style="color: #4a4a4a; margin: 0 0 21px;">
        If you have any questions in the meantime, reply to this email or call us at
        <a href="tel:+13212761159" style="color: #d80027; text-decoration: none;">(321) 276-1159</a>.
      </p>

      <p style="color: #6b6b6b; font-size: 13px; margin-top: 34px; padding-top: 13px; border-top: 1px solid #e2e2e2;">
        — The ChampionBullies Team
      </p>
    </div>
  `;

  const text = `Hi ${payload.firstName},

We received your reservation request for ${puppyLabel}.

Your reference: ${payload.reference}

What happens next:
1. We review your reservation details.
2. You'll receive payment instructions by email within one business day.
3. A $500 deposit holds ${puppyLabel} and comes off the price.

If you have any questions, reply to this email or call us at (321) 276-1159.

— The ChampionBullies Team
`;

  await transporter.sendMail({
    from: `"ChampionBullies" <${process.env.GOOGLE_USER}>`,
    to: payload.email,
    replyTo: process.env.OWNER_EMAIL ?? process.env.GOOGLE_USER,
    subject: `We received your reservation — ${payload.reference}`,
    text,
    html,
  });
}