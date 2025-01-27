import { z } from 'zod';

export const LOGIN_SCHEMA = z.object({
  email: z.string().email().min(1),
  password: z.string().regex(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).*$/).min(8)
});

export const SIGNUP_SCHEMA = LOGIN_SCHEMA.extend({
  confirmPassword: z.string().min(1),
  nickname: z.string().min(2).max(10).regex(/^[A-Za-z0-9가-힣]+$/)
}).refine(data => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"]
});

export type LoginForm = z.infer<typeof LOGIN_SCHEMA>;
export type SignupForm = z.infer<typeof SIGNUP_SCHEMA>;
