import type { LoginForm, SignupForm } from "@/utils/zod";
import { FormMode } from "@/types/auth";

type FormValues<T extends FormMode> =
    T extends 'login' ? LoginForm : SignupForm;

export const getDefaultValues = <T extends FormMode>(mode: T): { password: string; email: string } | {
  password: string;
  nickname: string;
  confirmPassword: string;
  email: string
} => {
  return mode === 'login'
      ? { email: '', password: '' }
      : { email: '', password: '', nickname: '', confirmPassword: '' };
};

export const getDevValues = <T extends FormMode>(mode: T): { password: string; email: string } | {
  password: string;
  nickname: string;
  confirmPassword: string;
  email: string
} => {
  return mode === 'login'
      ? { email: 'test@example.com', password: 'password123!' }
      : {
        email: 'test@example.com',
        password: 'password123!',
        nickname: 'tester',
        confirmPassword: 'password123!'
      };
};
