import { YStack, Text } from "tamagui";
import { StyledInput, LoginButton } from "../ui/styled";
import { FieldErrors } from "react-hook-form";

interface LoginFormProps {
  email: string;
  password: string;
  errors: FieldErrors<{ email: string; password: string }>;
  onEmailChange: (text: string) => void;
  onPasswordChange: (text: string) => void;
  onSubmit: () => void;
}

export function LoginForm({
  email,
  password,
  errors,
  onEmailChange,
  onPasswordChange,
  onSubmit,
}: LoginFormProps) {
  return (
    <YStack gap='$4' width='100%'>
      <StyledInput
        placeholder='Email'
        value={email}
        onChangeText={onEmailChange}
        autoCapitalize='none'
        keyboardType='email-address'
      />
      <StyledInput
        placeholder='Password'
        value={password}
        onChangeText={onPasswordChange}
        secureTextEntry
      />
      {errors &&
        Object.entries(errors).map(([field, error]) => (
          <Text key={field} color='$error' fontSize='$2' textAlign='center'>
            {error?.message || ""}
          </Text>
        ))}
      <LoginButton onPress={onSubmit}>
        <Text color='white' fontWeight='600' fontSize='$4'>
          로그인
        </Text>
      </LoginButton>
    </YStack>
  );
}
