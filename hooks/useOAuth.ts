import { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from 'expo-apple-authentication';
import { OAuthCredential, OAuthProvider } from "@/types/auth";

WebBrowser.maybeCompleteAuthSession();


interface OAuthHookProps {
  onSuccess?: (credential: OAuthCredential) => void;
  onError?: (error: Error, provider: OAuthProvider) => void;
}
export function useOAuth(props?: OAuthHookProps ) {

  // Google OAuth 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "아까 웹 클라이언트 아이디",
    androidClientId: "아까 안드로이드 클라이언트 아이디",
  });


  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await promptAsync();

      if (result?.type === 'success' && result.authentication?.accessToken) {
        // Google 사용자 정보 가져오기
        const userInfo = await fetchGoogleUserInfo(result.authentication.accessToken);

        const credential: OAuthCredential = {
          provider: 'google',
          token: result.authentication.accessToken,
          additionalInfo: {
            email: userInfo.email,
            name: userInfo.name,
            picture: userInfo.picture
          }
        };

        props?.onSuccess?.(credential);
      }
    } catch (error) {
      props?.onError?.(error instanceof Error ? error : new Error('Authentication failed'), 'google');
    }
  }, [promptAsync, props?.onSuccess, props?.onError]);

  const handleAppleLogin = useCallback(async (appleCredential: AppleAuthentication.AppleAuthenticationCredential) => {
    try {
      // identityToken이 null인 경우를 명시적으로 처리
      if (!appleCredential.identityToken) {
        throw new Error('Apple authentication failed: No identity token received');
      }

      const credential: OAuthCredential = {
        provider: 'apple',
        token: appleCredential.identityToken, // 이제 null이 아님이 보장됨
        additionalInfo: {
          // email이 null이면 undefined를 사용
          ...(appleCredential.email && { email: appleCredential.email }),
          // fullName이 null이 아닐 때만 포함
          ...(appleCredential.fullName && {
            name: `${appleCredential.fullName.givenName || ''} ${appleCredential.fullName.familyName || ''}`.trim()
          })
        }
      };

      props?.onSuccess?.(credential);
    } catch (error) {
      props?.onError?.(
          error instanceof Error ? error : new Error('Apple authentication failed'),
          'apple'
      );
    }
  }, [props?.onSuccess, props?.onError]);

  return {
    request,
    response,
    promptAsync,
    handleGoogleLogin,
    handleAppleLogin,
  };
}

// 구글 사용자 정보를 가져오는 유틸리티 함수 (선택 사항)
async function fetchGoogleUserInfo(accessToken: string) {
  const response = await fetch('https://www.googleapis.com/userinfo/v2/me', {
    headers: { Authorization: `Bearer ${accessToken}` },
  });
  return response.json();
}

async function processAppleCredentials(credentials: {
  user: string;
  email?: string | null;
  fullName?: AppleAuthentication.AppleAuthenticationFullName | null;
  identityToken: string | null;
  authorizationCode: string | null;
}) {
  // 여기에 실제 인증 로직을 구현합니다.
  try {
    console.log('Apple Credentials:', credentials);
    // 1. 백엔드로 전송
    // await api.authenticateWithApple(credentials);

    // 2. 관련 정보 저장
    // await SecureStore.setItemAsync('user_token', credentials.identityToken);

    // 3. 인증 컨텍스트 업데이트
    // await updateAuthState(credentials);
  } catch (error) {
    console.error('Failed to process Apple credentials:', error);
    throw error;
  }
}
