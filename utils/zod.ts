// schemas/auth.ts
import { z } from "zod";

// 공통 필드
const baseSchema = z.object({
  email: z.string().email("유효한 이메일을 입력해주세요"),

});

// 로그인 스키마
export const LOGIN_SCHEMA = baseSchema;
export type LoginForm = z.infer<typeof LOGIN_SCHEMA>;

// 회원가입 스키마
export const SIGNUP_SCHEMA = baseSchema.extend({
  nickname: z.string()
      .min(2, "2자 이상 입력해주세요")
      .max(10, "10자 이하로 입력해주세요")
      .regex(/^[a-zA-Z0-9가-힣]+$/, "특수문자는 사용할 수 없습니다"),
  password: z.string().min(8, "8자 이상 입력해주세요"),
  confirmPassword: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: "비밀번호가 일치하지 않습니다",
  path: ["confirmPassword"],
});


export type SignupForm = z.infer<typeof SIGNUP_SCHEMA>;
