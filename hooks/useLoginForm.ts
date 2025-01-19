import { useState } from "react";
import { Schema } from "@/utils/zod";
import { z } from 'zod';

type ValidationErrors = {
  email?: string;
  password?: string;
};

export const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validateForm = () => {
    try {
      Schema.parse({email, password})
      setErrors({})
      return true
    } catch (error) {
      if(error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {}
        error.errors.forEach((err) => {
          if(err.path[0]) {
            newErrors[err.path[0] as keyof ValidationErrors] = err.message
          }
        })
        setErrors(newErrors)
      }
      return false
    }
  }

  const handleEmailChange = (value: string) => {
    setEmail(value);
    setErrors((prev) => ({ ...prev, email: undefined }));
  };

  const handlePasswordChange = (value: string) => {
    setPassword(value);
    setErrors((prev) => ({ ...prev, password: undefined }));
  };

  return {
    email,
    password,
    errors,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
  };
}
