import {
  YStack, Text, Button, XStack, Form,
} from "tamagui";
import { useRouter } from "expo-router";
import { getResponsiveStyles } from "@/utils/styles";
import { useWindowDimensions } from "react-native";
import { useState } from "react";
import { Mail, ArrowLeft, User } from "@tamagui/lucide-icons";

import { CustomInput } from "@/components/common/CustomInput";
import { useSignupForm } from "@/hooks/useSignupForm";
import { SignupForm } from "@/utils/zod";
import { useWatch } from "react-hook-form";

export default function SignupScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = getResponsiveStyles(width);
  const [focused, setFocused] = useState("");

  const { errors, handleChange, onSubmit, form, validateForm } = useSignupForm(); // form 객체도 가져옴

  // form.watch 를 사용하여 각 필드의 값을 매핑
  const emailValue = useWatch({ control: form.control, name: "email" });
  const nicknameValue = useWatch({ control: form.control, name: "nickname" });
  const passwordValue = useWatch({ control: form.control, name: "password" });
  const confirmPasswordValue = useWatch({ control: form.control, name: "confirmPassword" });


  const handleSignupSubmit = async (data: SignupForm) => { // onSubmit 함수명 변경 (의미 명확화)
    // TODO: 회원가입 로직 구현 (API 호출 등)

    if(!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    
    console.log('Form submitted:', data); // 폼 데이터는 data 파라미터로 전달됨

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
                value={ emailValue }
                onChangeText={ (text) => handleChange('email')(text) }
                isFocused={ focused === 'email' }
                error={ errors.email?.toString() }
                placeholder="example@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
            />

            <CustomInput
                label="닉네임"
                icon={ <User /> }
                field="nickname"
                value={ nicknameValue } // 잘못된 초기값 설정 및 values 문제
                onChangeText={ (text) => handleChange('nickname')(text) }
                placeholder="2~10자 한글, 영문, 숫자"
                autoCapitalize="none"
            />


            <CustomInput
                label="비밀번호"
                icon={ <Mail /> }
                field="password"
                value={ passwordValue }
                onChangeText={ (text) => handleChange('password')(text) }
                isFocused={ focused === 'password' }
                error={ errors.email?.toString() }
                autoCapitalize="none"
                secureTextEntry
            />
            <CustomInput
                label="비밀번호 확인"
                icon={ <Lock /> }  // 동일하게 자물쇠 아이콘 사용
                field="confirmPassword"  // field 이름 수정
                value={ confirmPasswordValue }  // 올바른 값 참조
                onChangeText={ (text) => handleChange('confirmPassword')(text) }
                isFocused={ focused === 'confirmPassword' }
                error={ errors.confirmPassword?.toString() }
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
                onPress={ onSubmit(handleSignupSubmit) }
                pressStyle={ { scale: 0.98 } }
            >
              회원가입
            </Button>
          </YStack>
        </YStack>
      </Form>
  );
}
