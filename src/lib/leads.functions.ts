import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const name = z
  .string()
  .trim()
  .min(2, { message: "Please enter your full name" })
  .max(100, { message: "Name must be less than 100 characters" });

const email = z
  .string()
  .trim()
  .email({ message: "Please enter a valid email address" })
  .max(255, { message: "Email is too long" });

const phone = z
  .string()
  .trim()
  .min(7, { message: "Please enter a valid phone number" })
  .max(20, { message: "Phone number is too long" })
  .regex(/^[+()\-\s\d]+$/, { message: "Please enter a valid phone number" });

/** Hidden field: real users never fill it, bots usually do. */
const honeypot = z.string().max(0, { message: "Submission rejected" }).optional();

export const contactSchema = z.object({
  fullName: name,
  email,
  phone,
  message: z
    .string()
    .trim()
    .min(10, { message: "Please tell us a little more (10 characters minimum)" })
    .max(2000, { message: "Message must be less than 2000 characters" }),
  company: honeypot,
});

export const TIERS = [
  { value: "tier_1", label: "Tier 1 — ₦10,000,000 minimum" },
  { value: "tier_2", label: "Tier 2 — ₦50,000,000 minimum" },
  { value: "tier_3", label: "Tier 3 — ₦100,000,000 minimum" },
  { value: "entry", label: "Entry opportunity — from ₦1,000,000" },
] as const;

export const interestSchema = z.object({
  fullName: name,
  email,
  phone,
  tier: z.enum(["tier_1", "tier_2", "tier_3", "entry"], {
    message: "Please select a tier of interest",
  }),
  timeline: z.string().trim().max(120).optional(),
  referralSource: z.string().trim().max(120).optional(),
  company: honeypot,
});

export type ContactInput = z.infer<typeof contactSchema>;
export type InterestInput = z.infer<typeof interestSchema>;

export type SubmitResult = { status: "ok" } | { status: "error"; message: string };

const GENERIC_ERROR = "We couldn't submit your details right now. Please try again in a moment.";

async function notifyTeam(subject: string, lines: string[]) {
  const apiKey = process.env["RESEND_API_KEY"];
  const to = process.env["TEAM_NOTIFICATION_EMAIL"];
  if (!apiKey || !to) return;

  try {
    await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "Penuel Wealth Club <info@penuelprime.com>",
        to: [to],
        subject,
        text: lines.join("\n"),
      }),
    });
  } catch (error) {
    console.error("Team notification failed", error);
  }
}

export const submitContactMessage = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactSchema.parse(data))
  .handler(async ({ data }): Promise<SubmitResult> => {
    const { prisma } = await import("@/lib/prisma.server");

    try {
      await prisma.contactMessage.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          message: data.message,
        },
      });
    } catch (error) {
      console.error("Contact message failed", error);
      return { status: "error", message: GENERIC_ERROR };
    }

    await notifyTeam("New Penuel Wealth Club enquiry", [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      "",
      data.message,
    ]);

    return { status: "ok" };
  });

export const submitInterestApplication = createServerFn({ method: "POST" })
  .validator((data: unknown) => interestSchema.parse(data))
  .handler(async ({ data }): Promise<SubmitResult> => {
    const { prisma } = await import("@/lib/prisma.server");

    try {
      await prisma.interestApplication.create({
        data: {
          fullName: data.fullName,
          email: data.email.toLowerCase(),
          phone: data.phone,
          tier: data.tier,
          timeline: data.timeline || null,
          referralSource: data.referralSource || null,
        },
      });
    } catch (error) {
      console.error("Interest application failed", error);
      return { status: "error", message: GENERIC_ERROR };
    }

    const tierLabel = TIERS.find((tier) => tier.value === data.tier)?.label ?? data.tier;

    // Add contact to Mailchimp with WealthClubMember tag
    const { addContactToAudience } = await import("@/lib/mailchimp.server");
    const nameParts = data.fullName.trim().split(/\s+/);
    const firstName = nameParts[0] || "";
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : undefined;

    await addContactToAudience({
      email: data.email,
      firstName,
      lastName: lastName ?? undefined,
      phone: data.phone,
      tags: ["WealthClubMember"],
      mergeFields: {
        TIER: tierLabel,
        ...(data.timeline && { TIMELINE: data.timeline }),
        ...(data.referralSource && { SOURCE: data.referralSource }),
      },
    });

    await notifyTeam("New Penuel Wealth Club expression of interest", [
      `Name: ${data.fullName}`,
      `Email: ${data.email}`,
      `Phone: ${data.phone}`,
      `Tier of interest: ${tierLabel}`,
      `Timeline: ${data.timeline || "—"}`,
      `Heard about us via: ${data.referralSource || "—"}`,
    ]);

    return { status: "ok" };
  });
