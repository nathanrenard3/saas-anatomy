import { z } from "zod";
import disposableDomains from "disposable-email-domains";

const disposableSet = new Set<string>(disposableDomains);

const emailSchema = z.string().email().max(254).transform((val) => val.toLowerCase().trim());

export function validateEmail(email: unknown): {
  valid: boolean;
  email?: string;
  error?: string;
} {
  const result = emailSchema.safeParse(email);

  if (!result.success) {
    return { valid: false, error: "invalidEmail" };
  }

  const normalized = result.data;
  const domain = normalized.split("@")[1];

  if (disposableSet.has(domain)) {
    return {
      valid: false,
      error: "disposableEmail",
    };
  }

  return { valid: true, email: normalized };
}

export function isHoneypotFilled(value: unknown): boolean {
  return typeof value === "string" && value.length > 0;
}
