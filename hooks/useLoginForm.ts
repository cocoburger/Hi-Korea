import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { LOGIN_SCHEMA, LoginForm } from "@/utils/zod";


export const useLoginForm = () => {
  const form = useForm<LoginForm>({
    resolver: zodResolver(LOGIN_SCHEMA),
    defaultValues:
        { email: '', password: '' }
  });

  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  // 타입 가드를 사용한 메서드 오버로딩
  const handleChange = (field: keyof LoginForm) => (text: string) => {
    setValue(field, text, { shouldValidate: true });
  };

  const validateForm = async () => {
    return form.trigger();
  };

  const onSubmit = (callback: SubmitHandler<LoginForm>) => handleSubmit(callback);

  return {
    form,
    errors,
    handleChange,
    onSubmit,
    validateForm,
  };
}
