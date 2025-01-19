// types/auth.ts
export type OAuthProvider = 'google' | 'apple' | 'kakao' | 'naver';  // 필요한 제공자 추가 가능

export interface OAuthCredential {
  provider: OAuthProvider;
  token: string;
  // 제공자별로 다른 추가 정보를 포함할 수 있음
  additionalInfo?: {
    email?: string;
    name?: string;
    picture?: string;
    [key: string]: any;
  };
}


interface AuthenticationResult {
  success: boolean;
  userInfo?: {
    id: string;
    email?: string;
    name?: string;
    picture?: string;
    [key: string]: any;
  };
  error?: string;
}
async function handleGoogleAuthentication(credential: OAuthCredential): Promise<AuthenticationResult> {
  try {
    // 1. Google 토큰 검증
    const response = await fetch('https://your-backend-api/auth/google', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: credential.token,
        // 추가 정보가 있다면 포함
        ...credential.additionalInfo
      })
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with server');
    }

    const data = await response.json();

    return {
      success: true,
      userInfo: {
        id: data.userId,
        email: data.email,
        name: data.name,
        picture: data.picture,
        // 추가 필드가 있다면 포함
      }
    };
  } catch (error) {
    console.error('Google authentication processing failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Google authentication failed'
    };
  }
}

async function handleAppleAuthentication(credential: OAuthCredential): Promise<AuthenticationResult> {
  try {
    // 1. Apple 토큰 검증
    const response = await fetch('https://your-backend-api/auth/apple', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        token: credential.token,
        // 추가 정보가 있다면 포함
        ...credential.additionalInfo
      })
    });

    if (!response.ok) {
      throw new Error('Failed to authenticate with server');
    }

    const data = await response.json();

    return {
      success: true,
      userInfo: {
        id: data.userId,
        email: data.email,
        name: data.name,
        // Apple은 사진을 제공하지 않을 수 있음
        // 추가 필드가 있다면 포함
      }
    };
  } catch (error) {
    console.error('Apple authentication processing failed:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Apple authentication failed'
    };
  }
}



async function handleOAuthLogin(credential: OAuthCredential) {
  // 실제 구현에서는 서버에 인증 요청을 보내고 응답을 처리
  switch (credential.provider) {
    case 'google':
      // Google 특정 처리
      return handleGoogleAuthentication(credential);
    case 'apple':
      // Apple 특정 처리
      return handleAppleAuthentication(credential);
      // 다른 제공자들 추가 가능
    default:
      throw new Error(`Unsupported OAuth provider: ${credential.provider}`);
  }
}


export {
  handleOAuthLogin,
  // 개별 함수들도 필요하다면 내보낼 수 있습니다
  handleGoogleAuthentication,
  handleAppleAuthentication
};
