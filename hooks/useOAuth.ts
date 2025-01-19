import { useCallback, useEffect } from 'react';
import * as WebBrowser from 'expo-web-browser';
import * as Google from "expo-auth-session/providers/google";
import * as AppleAuthentication from 'expo-apple-authentication';
// import { AuthRequestConfig, DiscoveryDocument } from "expo-auth-session";

WebBrowser.maybeCompleteAuthSession();


interface OAuthProps {
  onSuccess?: (token: string) => void;
  onError?: (error: Error) => void;
}

export function useOAuth(props?: OAuthProps) {
  const {
    onSuccess = (token: string) => console.log('Authentication successful, but no onSuccess handler provided'),
    onError = (error: Error) => console.log('Authentication error, but no onError handler provided')
  } = props || {};

  // Google OAuth 설정
  const [request, response, promptAsync] = Google.useAuthRequest({
    webClientId: "아까 웹 클라이언트 아이디",
    androidClientId: "아까 안드로이드 클라이언트 아이디",
  });


  // React Navigation 등의 환경에서 response를 처리하는 방법
  useEffect(() => {
    if (response) {
      if (response.type === 'success') {
        // Google 로그인 성공
        const { access_token } = response.params;
        if (access_token && onSuccess) {
          onSuccess(access_token);
        }
      } else if (response.type === 'cancel' || response.type === 'dismiss') {
        // 사용자가 취소하거나 닫은 경우
        console.log('Authentication cancelled or dismissed');
      } else {
        // 다른 오류 상황
        console.log('Authentication failed', response);
        if (onError && response) {
          onError(new Error(response.toString()));
        }
      }
    }
  }, [response, onSuccess, onError]);

  // Google 로그인 처리
  const handleGoogleLogin = useCallback(async () => {
    try {
      const result = await promptAsync();

      // Let's handle each possible authentication result type
      switch (result?.type) {
        case 'success': {
          // Authentication was successful
          const { authentication } = result;

          if (!authentication) {
            console.log('Authentication successful but no credentials received');
            return;
          }

          // Process the successful authentication
          const { accessToken } = authentication;
          try {
            // Fetch user information using the access token
            const userInfo = await fetch('https://www.googleapis.com/userinfo/v2/me', {
              headers: { Authorization: `Bearer ${accessToken}` },
            }).then(response => response.json());

            console.log('Successfully retrieved Google user info:', userInfo);

            // Here you might want to:
            // 1. Send this information to your backend
            // 2. Update your local authentication state
            // 3. Navigate to the next screen

          } catch (userInfoError) {
            console.error('Failed to fetch Google user info:', userInfoError);
            if (onError) {
              onError(new Error('Failed to fetch user information'));
            }
          }
          break;
        }

        case 'cancel': {
          // User intentionally cancelled the authentication process
          console.log('User cancelled Google login');
          // You might want to show a user-friendly message
          // or simply do nothing as this is a user-initiated action
          break;
        }

        case 'dismiss': {
          // Authentication modal was dismissed without completion
          console.log('Google login modal was dismissed');
          // Similar to cancel, but might be due to system events
          // You might want to show a "Try again" message
          break;
        }

        case 'locked': {
          // Authentication is locked, usually due to security reasons
          console.log('Google login is locked');
          if (onError) {
            onError(new Error('Authentication is currently locked. Please try again later.'));
          }
          break;
        }

        default: {
          // Handle any unexpected result types
          console.log('Unexpected authentication result:', result);
          if (onError) {
            onError(new Error('Unexpected authentication result'));
          }
        }
      }
    } catch (error) {
      // Handle any errors that occur during the authentication process itself
      console.error('Google login process failed:', error);
      if (onError) {
        onError(error instanceof Error ? error : new Error('Authentication failed'));
      }
    }
  }, [promptAsync, onError]);

  // Apple 로그인 처리
  const handleAppleLogin = useCallback(async (credential: AppleAuthentication.AppleAuthenticationCredential) => {
    try {
      const { user, email, fullName, identityToken, authorizationCode } = credential;

      // 백엔드로 전송하거나 상태를 업데이트합니다
      await processAppleCredentials({
        user,
        email,
        fullName,
        identityToken,
        authorizationCode,
      });
      if (identityToken && onSuccess) {
        onSuccess(identityToken);
      }
    } catch (error: any) {
      console.error('Apple login processing failed:', error);
      if (onError) {
        onError(error);
      }
      throw error;
    }
  }, [onSuccess, onError]);

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
