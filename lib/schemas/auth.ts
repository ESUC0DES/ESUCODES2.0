import { z } from 'zod'

/**
 * Login Schema - Strict Input Validation
 * 
 * Security Requirements:
 * - Username: Alphanumeric, hyphens, underscores only (prevents injection)
 * - Password: Minimum 8 characters (security best practice)
 * - Both fields are trimmed to remove leading/trailing whitespace
 */
export const LoginSchema = z.object({
  username: z
    .string()
    .min(3, 'Kullanici adi en az 3 karakter olmalidir')
    .max(30, 'Kullanici adi en fazla 30 karakter olabilir')
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      'Kullanici adi sadece harf, rakam, tire ve alt cizgi icerebilir'
    )
    .trim(),
  password: z
    .string()
    .min(8, 'Sifre en az 8 karakter olmalidir')
    .trim(),
})

export type LoginInput = z.infer<typeof LoginSchema>

