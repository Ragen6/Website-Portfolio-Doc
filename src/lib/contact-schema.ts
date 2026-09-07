import { z } from "zod";

const MAX_MESSAGE_WORDS = 256;
const MAX_WORD_LENGTH = 100;

function addWordLimitIssues(
  value: string,
  ctx: z.RefinementCtx,
  maxWords: number,
  maxWordLength: number,
) {
  const words = value.match(/\S+/g) ?? [];
  if (words.length > maxWords) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Please use no more than ${maxWords} words`,
    });
  }
  if (words.some((word) => Array.from(word).length > maxWordLength)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: `Each word must be ${maxWordLength} characters or fewer`,
    });
  }
}

const nameSchema = z
  .string()
  .trim()
  .min(2, "Please enter your name")
  .max(80, "Please use 80 characters or fewer")
  .superRefine((name, ctx) => addWordLimitIssues(name, ctx, 12, 50));

const phoneSchema = z
  .string()
  .trim()
  .min(6, "Please enter a valid phone number")
  .max(30, "Please use 30 characters or fewer")
  .regex(/^\+?[0-9().\s-]+$/, "Use only digits and common phone-number symbols")
  .refine((phone) => phone.replace(/\D/g, "").length >= 6, "Please enter a valid phone number");

const subjectSchema = z
  .string()
  .trim()
  .min(2, "Please add a subject")
  .max(300, "Please use 300 characters or fewer")
  .refine((subject) => !/\d/.test(subject), "Numbers are not allowed in the subject")
  .superRefine((subject, ctx) => addWordLimitIssues(subject, ctx, 20, 50));

const messageSchema = z
  .string()
  .trim()
  .min(10, "Please describe your request")
  .max(MAX_MESSAGE_WORDS * MAX_WORD_LENGTH, "Your message is too long")
  .superRefine((message, ctx) =>
    addWordLimitIssues(message, ctx, MAX_MESSAGE_WORDS, MAX_WORD_LENGTH),
  );

export const contactSchema = z.object({
  name: nameSchema,
  email: z.string().trim().email("Please enter a valid email").max(255),
  phone: phoneSchema,
  subject: subjectSchema,
  message: messageSchema,
  turnstileToken: z.string().min(1, "Please complete the security check").max(2048),
  website: z.string().trim().max(200),
  formStartedAt: z.number().int().positive(),
});

export type ContactInput = z.infer<typeof contactSchema>;
