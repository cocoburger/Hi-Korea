import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useOAuth } from "@/hooks/useOAuth";
import * as AppleAuthentication from "expo-apple-authentication";

import { YStack, Text } from "tamagui";
import { Card, Title, Subtitle } from "@/components/ui/styled";
import { LoginForm } from "@/components/auth/LoginForm";
import { AuthButton } from "@/components/auth/SignUpButton";
import { useAppleAuth } from "@/hooks/useAppleAuth";
import { useLoginForm } from "@/hooks/useLoginForm";
import { useWatch } from "react-hook-form";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const { errors, handleChange, onSubmit, form, validateForm } = useLoginForm();
  const { login, loginWithOAuth } = useAuth();
  const { handleGoogleLogin, handleAppleLogin } = useOAuth({
    onSuccess: async (credential) => {
      const success = await loginWithOAuth(credential);
      if(success) {
        router.replace("/(tabs)");
      }
    },
    onError: (error, provider) => {
      console.error(`${ provider } login failed:`, error);
      // 에러 처리
    },
  });

  const emailValue = useWatch({ control: form.control, name: "email" });
  const passwordValue = useWatch({ control: form.control, name: "password" });

  const { handleAppleSignIn } = useAppleAuth(handleAppleLogin);


  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState<boolean | null>(null);


  const handleLogin = async () => {
    if(__DEV__) {
      // 개발모드에서만 하드코딩 로그인 메시지 표시
      console.log("개발모드: 테스트계정 로그인 완료");
    }

    if(!validateForm()) {
      console.log("Form validation failed");
      return;
    }

    try {
      const success = await login(emailValue, passwordValue);
      if(success) {
        router.replace("/(tabs)");
      } else {
        setLoginError(
            "로그인에 실패했습니다. 이메일과 비밀번호를 확인해주세요."
        );
      }
    } catch (err) {
      setLoginError("로그인 중 오류가 발생했습니다.");
    }
  };

  const animatedValue = new Animated.Value(0);

  useEffect(() => {
    Promise.all([
      // 필요한 모든 초기화 작업들을 여기에 추가
      new Promise((resolve) => setTimeout(resolve, 0)), // 최소한의 지연
    ]).finally(() => {
      setIsLoading(false);
    });
  }, []);

  useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleAuthAvailable);
  }, []);

  if(isLoading) {
    return null; // 또는 로딩 스피너
  }

  const spin = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  return (
      <LinearGradient
          colors={ ["#52BEB5", "#73B2D9", "#FFE5E5"] }
          style={ { flex: 1 } }
          start={ { x: 0, y: 0 } }
          end={ { x: 1, y: 1 } }
      >
        <YStack
            flex={ 1 }
            padding='$4'
            justifyContent='center'
            alignItems='center'
        >
          <Card>
            <YStack gap='$4'>
              <Title>Hi Korea</Title>
              <Subtitle>Your Special Trip to Korea</Subtitle>
              <LoginForm
                  email={ emailValue }
                  password={ passwordValue }
                  errors={ errors }
                  onEmailChange={ (text) => handleChange('email')(text) }
                  onPasswordChange={ (text) => handleChange('password')(text) }
                  onSubmit={ handleLogin }
              />

              <YStack
                  gap='$2'
                  alignItems='center'
              >
                <AuthButton
                    variant="google"
                    onPress={ handleGoogleLogin }
                >
                  Google로 계속하기
                </AuthButton>

                { isAppleAuthAvailable && (
                    <AppleAuthentication.AppleAuthenticationButton
                        buttonType={ AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN }
                        buttonStyle={ AppleAuthentication.AppleAuthenticationButtonStyle.BLACK }
                        cornerRadius={ 8 }
                        style={ { width: "100%", height: 44 } }
                        onPress={ handleAppleSignIn }
                    />
                ) }
              </YStack>

              <YStack
                  gap='$4'
                  alignItems='center'
              >
                <AuthButton
                    variant='email'
                    size='large'
                    iconName='mail'
                    marginTop='$6'
                    onPress={ () => router.push("/signup") }
                >
                  <Text
                      color='black'
                      fontWeight='600'
                      fontSize={ 16 }
                  >
                    SIGN UP
                  </Text>
                </AuthButton>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      </LinearGradient>
  );
}
