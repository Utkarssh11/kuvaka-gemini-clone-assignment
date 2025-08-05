import { z } from 'zod'

export const phoneSchema = z.object({
  countryCode: z.string().min(1, 'Country code is required'),
  phoneNumber: z.string()
    .min(1, 'Phone number is required')
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be less than 15 digits')
    .regex(/^\d+$/, 'Phone number must contain only digits')
    .transform((val) => val.replace(/\s+/g, '')) // Remove spaces
    .refine((val) => val.length >= 10, {
      message: 'Phone number must be at least 10 digits'
    })
    .refine((val) => val.length <= 15, {
      message: 'Phone number must be less than 15 digits'
    })
})

export const otpSchema = z.object({
  otp: z.string()
    .min(1, 'OTP is required')
    .min(6, 'OTP must be at least 6 digits')
    .max(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must contain only digits')
    .transform((val) => val.replace(/\s+/g, '')) // Remove spaces
})

export const chatroomSchema = z.object({
  title: z.string()
    .min(1, 'Chat title is required')
    .max(50, 'Chat title must be less than 50 characters')
})

export const messageSchema = z.object({
  content: z.string()
    .min(1, 'Message cannot be empty')
    .max(1000, 'Message must be less than 1000 characters')
}) 