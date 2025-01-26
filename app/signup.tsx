import { YStack, Text, Button } from "tamagui";
import { useRouter } from "expo-router";
import { getResponsiveStyles } from "@/utils/styles";
import { useWindowDimensions } from "react-native";
import { AuthCard } from "@/components/auth/AuthCard";
import { AuthInput } from "@/components/auth/AuthInput";

export default function SignupScreen() {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const styles = getResponsiveStyles(width);

  return (
      <YStack
          flex={ 1 }
          backgroundColor='$background'
          alignItems='center'
          justifyContent='center'
      >
        <AuthCard
            styles={ styles }
            title={ '회원가입' }
        >
          <YStack gap={ 24 }>
            <YStack gap={ 8 }>
              <Text
                  fontSize={ 24 }
                  fontWeight='700'
                  textAlign='center'
              >
                회원가입
              </Text>
              <Text
                  fontSize={ 16 }
                  color='$gray10'
                  textAlign='center'
              >
                Hi Korea의 회원이 되어주세요
              </Text>
            </YStack>

            <YStack gap={ 16 }>
              <AuthInput
                  label='이메일'
                  placeholder='이메일을 입력해주세요'
                  keyboardType='email-address'
                  autoCapitalize='none'
                  styles={ styles }
              />
              <AuthInput
                  label='비밀번호'
                  placeholder='비밀번호를 입력해주세요'
                  secureTextEntry
                  styles={ styles }
              />
              <AuthInput
                  label='비밀번호 확인'
                  placeholder='비밀번호를 다시 입력해주세요'
                  secureTextEntry
                  styles={ styles }
              />
              <AuthInput
                  label='닉네임'
                  placeholder='닉네임을 입력해주세요'
                  keyboardType='default'
                  styles={ styles }
              />
            </YStack>

            <YStack gap={ 8 }>
              <Button
                  backgroundColor='$blue10'
                  color='white'
                  size='$5'
                  onPress={ () => console.log("회원가입") }
              >
                회원가입
              </Button>
              <Button
                  backgroundColor='$gray2'
                  color='$gray11'
                  size='$5'
                  onPress={ () => router.back() }
              >
                돌아가기
              </Button>
            </YStack>
          </YStack>
        </AuthCard>
      </YStack>
  );
}
