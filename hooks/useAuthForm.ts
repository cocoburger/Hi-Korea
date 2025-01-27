import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, UseFormWatch } from "react-hook-form";
import { LOGIN_SCHEMA, LoginForm, SIGNUP_SCHEMA, SignupForm } from "@/utils/zod";
import { getDefaultValues, getDevValues } from "@/utils/authHelper";
import { FormMode, FormValues } from "@/types/auth";


type useLoginFormProps = {
  mode: FormMode
}


export const useAuthForm = ({ mode }: useLoginFormProps) => {
  const Schema = mode === 'login' ? LOGIN_SCHEMA : SIGNUP_SCHEMA;
  type FormInputs = FormValues[typeof mode];

  const form = useForm<FormInputs>({
    resolver: zodResolver(Schema),
    defaultValues: __DEV__ ? getDevValues(mode) : getDefaultValues(mode)
  });

  const { watch, formState: { errors }, setValue } = form;

  const watchedValues = watch();


  const handleChange = (field: keyof FormInputs) =>
      (value: string) => {
        setValue(field, value);
      };

  const validateForm = () => {
    return form.trigger();
  };

  return {
    form,
    values: watchedValues,
    errors,
    handleChange,
    validateForm
  };
}
