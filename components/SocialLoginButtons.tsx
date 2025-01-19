import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import * as AppleAuthentication from 'expo-apple-authentication';
import * as Google from 'expo-auth-session/providers/google';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface SocialLoginButtonsProps {
  onGoogleLogin: () => Promise<void>;
  onAppleLogin: (credential: AppleAuthentication.AppleAuthenticationCredential) => Promise<void>;
}

export function SocialLoginButtons({
                                     onGoogleLogin,
                                     onAppleLogin,
                                   }: SocialLoginButtonsProps) {
  // Apple 로그인 버튼은 iOS에서만 표시합니다
  const [isAppleAuthAvailable, setIsAppleAuthAvailable] = React.useState(false);

  React.useEffect(() => {
    const checkAppleAuth = async () => {
      const isAvailable = await AppleAuthentication.isAvailableAsync();
      setIsAppleAuthAvailable(isAvailable);
    };
    checkAppleAuth();
  }, []);

  const handleAppleLogin = async () => {
    try {
      const credential = await AppleAuthentication.signInAsync({
        requestedScopes: [
          AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
          AppleAuthentication.AppleAuthenticationScope.EMAIL,
        ],
      });
      await onAppleLogin(credential);
    } catch (e) {
      if (e === 'ERR_REQUEST_CANCELED') {
        // 사용자가 로그인을 취소한 경우의 처리
        console.log('User canceled Apple login');
      } else {
        // 기타 에러 처리
        console.error('Apple login error:', e);
      }
    }
  };

  return (
      <View style={styles.container}>
        <ThemedText style={styles.dividerText}>또는</ThemedText>

        {/* Google 로그인 버튼 */}
        <TouchableOpacity
            style={[styles.socialButton, styles.googleButton]}
            onPress={onGoogleLogin}
        >
          <Ionicons name="logo-google" size={24} color="#FFFFFF" />
          <ThemedText style={styles.socialButtonText}>Google로 계속하기</ThemedText>
        </TouchableOpacity>

        {/* Apple 로그인 버튼 - iOS에서만 표시 */}
        {isAppleAuthAvailable && (
            <AppleAuthentication.AppleAuthenticationButton
                buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
                buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
                cornerRadius={8}
                style={styles.appleButton}
                onPress={handleAppleLogin}
            />
        )}
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    width: '100%',
  },
  dividerText: {
    textAlign: 'center',
    marginVertical: 15,
    color: '#666',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 12,
    borderRadius: 8,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 3,
  },
  socialButtonText: {
    marginLeft: 10,
    fontSize: 16,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  googleButton: {
    backgroundColor: '#4285F4',
  },
  appleButton: {
    width: '100%',
    height: 44,
    marginVertical: 8,
  },
});
