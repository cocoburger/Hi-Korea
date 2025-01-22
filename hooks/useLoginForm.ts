import { useEffect } from "react";
import { Schema } from "@/utils/zod";
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

type LoginFormInputs = z.infer<typeof Schema>;

export const useLoginForm = () => {
  const form = useForm<LoginFormInputs>({
    resolver: zodResolver(Schema),
    defaultValues: {
      email: '',
      password: ''
    }
  });

  const { setValue, watch, formState: { errors } } = form;


  useEffect(() => {
    if(__DEV__) {
      setValue('email', 'test@example.com');
      setValue('password', 'password123!');
    }
  }, [setValue]);

  const validateForm = () => {
    return form.trigger();
  };

  return {
    email: watch('email'),
    password: watch('password'),
    errors,
    handleEmailChange: (value: string) => setValue('email', value),
    handlePasswordChange: (value: string) => setValue('password', value),
    validateForm,
  };
}
