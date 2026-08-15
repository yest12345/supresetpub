import { z } from 'zod'

const usernameSchema = z
  .string()
  .trim()
  .min(3, '用户名需为 3-50 位')
  .max(50, '用户名需为 3-50 位')
  .regex(/^[a-zA-Z0-9_]+$/, '用户名仅允许字母、数字和下划线')

const passwordSchema = z
  .string()
  .min(6, '密码至少 6 位')

export const registerSchema = z
  .object({
    name: usernameSchema,
    password: passwordSchema,
    confirmPassword: z.string().optional()
  })
  .superRefine((data, ctx) => {
    if (data.confirmPassword !== undefined && data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: 'custom',
        message: '两次输入的密码不一致',
        path: ['confirmPassword']
      })
    }
  })

export const loginSchema = z.object({
  name: usernameSchema,
  password: z.string().min(1, '密码不能为空')
})

export function formatZodError(error: z.ZodError) {
  return error.issues[0]?.message || '请求参数无效'
}
