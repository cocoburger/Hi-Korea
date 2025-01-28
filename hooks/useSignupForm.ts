import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { SIGNUP_SCHEMA, SignupForm } from "@/utils/zod";


export const useSignupForm = () => {
  const form = useForm<SignupForm>({
    resolver: zodResolver(SIGNUP_SCHEMA),
    defaultValues:
        { email: '', password: '', nickname: '', confirmPassword: '' }
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const handleChange = (field: keyof SignupForm) =>
      (value: string) => setValue(field, value, { shouldValidate: true });


  const validateForm = async () => {
    return form.trigger();
  };

  const onSubmit = (callback: SubmitHandler<SignupForm>) => handleSubmit(callback);

  return {
    form,
    errors,
    handleChange,
    onSubmit,
    validateForm,
  };
};
