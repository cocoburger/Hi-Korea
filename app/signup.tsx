import {
  YStack, Text, Button, XStack, Form,
} from "tamagui";
import { useRouter } from "expo-router";
import { getResponsiveStyles } from "@/utils/styles";
import { useWindowDimensions } from "react-native";
import { useState } from "react";
import { Mail, ArrowLeft, User } from "@tamagui/lucide-icons";
import { useAuthForm } from "@/hooks/useAuthForm";
import { CustomInput } from "@/components/common/CustomInput";

export default function SignupScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = getResponsiveStyles(width);
  const [focused, setFocused] = useState("");

  // useLoginForm hook을 사용하여 폼 상태와 유효성 검사를 관리합니다
  const { values, errors, handleChange, validateForm } = useAuthForm({
    mode: 'signup' as const  // Add 'as const' to ensure literal type
  });

  const handleSubmit = async () => {
    const isValid = await validateForm();
    if(isValid) {
      // TODO: 회원가입 로직 구현
      console.log('Form submitted:', values);
    }
  };

  return (
      <Form
          backgroundColor="$background"
          flex={ 1 }
          padding={ styles.spacing.screenPadding }
      >
        <YStack
            gap="$4"
            maxWidth={ 600 }
            width="100%"
            marginHorizontal="auto"
            paddingVertical="$8"
        >
          {/* 헤더 부분은 동일하게 유지 */ }
          <XStack
              gap="$2"
              alignItems="center"
          >
            <Button
                icon={ ArrowLeft }
                backgroundColor="transparent"
                onPress={ () => router.back() }
            />
            <Text
                fontSize="$8"
                fontWeight="900"
                color="$blue12"
            >
              Hi Korea
            </Text>
          </XStack>

          <YStack
              gap="$4"
              marginTop="$4"
          >
            <YStack>
              <Text
                  fontSize="$7"
                  fontWeight="800"
              >
                Welcome! 👋
              </Text>
              <Text
                  fontSize="$4"
                  color="$gray11"
              >
                Hi Korea의 회원이 되어 다양한 경험을 즐겨보세요
              </Text>
            </YStack>

            <CustomInput
                label="이메일"
                icon={ <Mail /> }
                field="email"
                value={ values.email }
                onChangeText={ handleChange('email') }
                isFocused={ focused === 'email' }
                error={ errors.email?.message }
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <CustomInput
                label="닉네임"
                icon={ <User /> }  // 사용자 아이콘으로 변경
                field="nickname"  // field 이름 수정
                value={ "nickname" in values ? values.nickname : '' }  // 올바른 값 참조
                onChangeText={ handleChange('nickname') }
                isFocused={ focused === 'nickname' }
                error={ errors?.nickname?.message }
                placeholder="2~10자 한글, 영문, 숫자"  // 닉네임 형식 안내
                autoCapitalize="none"
            />


            <CustomInput
                label="비밀번호"
                icon={ <Mail /> }
                field="password"
                value={ values.email }
                onChangeText={ handleChange('password') }
                isFocused={ focused === 'password' }
                error={ errors.password?.message }
                autoCapitalize="none"
                secureTextEntry
            />
            <CustomInput
                label="비밀번호 확인"
                icon={ <Lock /> }  // 동일하게 자물쇠 아이콘 사용
                field="confirmPassword"  // field 이름 수정
                value={ values.confirmPassword }  // 올바른 값 참조
                onChangeText={ handleChange('confirmPassword') }
                isFocused={ focused === 'confirmPassword' }
                error={ errors.confirmPassword?.message }
                placeholder="비밀번호를 다시 입력해주세요"
                secureTextEntry
                autoCapitalize="none"
            />


            <Button
                backgroundColor="$blue11"
                color="white"
                size="$4"
                fontWeight="700"
                marginTop="$4"
                onPress={ handleSubmit }
                pressStyle={ { scale: 0.98 } }
            >
              회원가입
            </Button>
          </YStack>
        </YStack>
      </Form>
  );
}
