import React, { useEffect, useState } from "react";
import { StyleSheet, Animated, Dimensions } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useAuth } from "@/contexts/AuthContext";
import { useOAuth } from "@/hooks/useOAuth";

import { useLoginForm } from "@/hooks/useLoginForm";
import { YStack, Text } from "tamagui";
import { Card, Title, Subtitle } from "@/components/ui/styled";
import { LoginForm } from "@/components/auth/LoginForm";
import { SocialLoginButtons } from "@/components/auth/SocialLoginButtons";
import { SignUpButton } from "@/components/auth/SignUpButton";

const { width } = Dimensions.get("window");

export default function LoginScreen() {
  const {
    email,
    password,
    errors,
    handleEmailChange,
    handlePasswordChange,
    validateForm,
  } = useLoginForm();

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

  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(true);

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
      const success = await login(email, password);
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
                  email={ email }
                  password={ password }
                  errors={ errors }
                  onEmailChange={ handleEmailChange }
                  onPasswordChange={ handlePasswordChange }
                  onSubmit={ handleLogin }
              />

              <YStack
                  gap='$2'
                  alignItems='center'
              >
                <SocialLoginButtons
                    onGoogleLogin={ handleGoogleLogin }
                    onAppleLogin={ handleAppleLogin }
                />
              </YStack>
              <YStack
                  gap='$2'
                  alignItems='center'
              >
                <SignUpButton
                    variant="secondary"
                    size="large"
                    iconName="mail"
                    marginTop="$4"
                >
                  <Text>SIGN UP</Text>
                </SignUpButton>
              </YStack>
            </YStack>
          </Card>
        </YStack>
      </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    overflow: "hidden",
  },
  textContainer: {
    width: "100%",
    marginBottom: 20,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 15,
  },
  errorContainer: {
    width: "100%",
    marginBottom: 10,
  },
  buttonContainer: {
    width: "100%",
    marginTop: 5,
  },
  socialButtonsContainer: {
    width: "100%",
    marginTop: 15,
  },
  backgroundPattern: {
    position: "absolute",
    width: width * 2,
    height: width * 2,
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: width,
    top: -width,
    left: -width / 2,
  },
  formContainer: {
    // 비색과 옥색을 활용한 그라데이션 효과
    backgroundColor: "rgba(116, 192, 177, 0.25)",
    borderRadius: 20,
    padding: 30,
    margin: 20,
    // 글래스모피즘 효과를 위한 backdrop-filter 스타일
    backdropFilter: "blur(8px)",
    // 입체감을 위한 테두리 추가
    borderWidth: 1,
    borderColor: "rgba(140, 212, 212, 0.3)",
    // 그림자 효과 수정
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
    // 내부 컨테이너에 추가적인 반투명 효과
    overflow: "hidden",
  },
  innerContainer: {
    borderRadius: 15,
    backgroundColor: "rgba(255, 255, 255, 0.85)",
    padding: 20,
  },
  headerContainer: {
    backgroundColor: "rgba(255, 255, 255, 0.85)",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 8,
    // 적자색 유지
    color: "#C1718A",
  },
  subtitle: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 24,
    // 청벽색 유지
    color: "#748EBC",
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    // 천청색을 활용한 테두리
    borderColor: "rgba(115, 178, 217, 0.5)",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#D94C9E",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  buttonText: {
    color: "#F1F1F1",
    fontSize: 16,
    fontWeight: "bold",
  },
  error: {
    color: "#CE4537",
    marginBottom: 10,
    textAlign: "center",
  },
});
