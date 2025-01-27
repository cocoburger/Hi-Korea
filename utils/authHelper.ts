import { FormMode, FormValues } from "@/types/auth";

export const getDefaultValues = (mode: FormMode): FormValues[typeof mode] => ({
  login: {
    email: '',
    password: ''
  },
  signup: {
    email: '',
    password: '',
    confirmPassword: '',
    nickname: ''
  }
}[mode]);


export const getDevValues = (mode: 'login' | 'signup') => ({
  login: {
    email: 'test@example.com',
    password: 'password123!'
  },
  signup: {
    email: 'signup@example.com',
    password: 'signup123!',
    confirmPassword: 'signup123!',
    nickname: 'tester'
  }
}[mode]);
