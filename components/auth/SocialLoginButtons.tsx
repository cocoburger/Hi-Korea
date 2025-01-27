import React, { useState } from "react";
import { YStack, Button, Text, XStack } from "tamagui";
import * as AppleAuthentication from "expo-apple-authentication";
import { AntDesign } from "@expo/vector-icons";

interface SocialLoginButtonsProps {
  onGoogleLogin: () => Promise<void>;
  onAppleLogin: (
      credential: AppleAuthentication.AppleAuthenticationCredential
  ) => Promise<void>;
}

export function SocialLoginButtons({
                                     onGoogleLogin,
                                     onAppleLogin,
                                   }: SocialLoginButtonsProps) {
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = useState<
      boolean | null
  >(null);

  React.useEffect(() => {
    AppleAuthentication.isAvailableAsync().then(setIsAppleAuthAvailable);
  }, []);

  if(isAppleAuthAvailable === null) {
    return null; // 아직 Apple 인증 체크가 완료되지 않음
  }

  return (
      <YStack
          gap='$3'
          width='100%'
      >
        <Button
            backgroundColor='#4285F4'
            height={ 44 }
            onPress={ onGoogleLogin }
            pressStyle={ { opacity: 0.8 } }
            hoverStyle={ {
              backgroundColor: "#3367D6", // Google의 더 진한 파란색
              opacity: 0.9,
            } }
        >
          <XStack
              alignItems='center'
              justifyContent='center'
              gap='$2'
          >
            <AntDesign
                name='google'
                size={ 18 }
                color='white'
            />
            <Text
                color='white'
                fontWeight='600'
                fontSize={ 16 }
            >
              Google로 계속하기
            </Text>
          </XStack>
        </Button>

        { isAppleAuthAvailable && (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={ AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN }
                buttonStyle={ AppleAuthentication.AppleAuthenticationButtonStyle.BLACK }
                cornerRadius={ 8 }
                style={ { width: "100%", height: 44 } }
                onPress={ async () => {
                  try {
                    const credential = await AppleAuthentication.signInAsync({
                      requestedScopes: [
                        AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
                        AppleAuthentication.AppleAuthenticationScope.EMAIL,
                      ],
                    });
                    await onAppleLogin(credential);
                  } catch (e: any) {
                    if(e.code !== "ERR_CANCELED") {
                      console.error("Apple 로그인 실패:", e);
                    }
                  }
                } }
            />
        ) }
      </YStack>
  );
}
