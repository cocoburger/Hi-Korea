import { AuthenticationResult, AuthProvider } from "@/types/auth";

export const mockOAuthResponses: {
  apple: { userInfo: { name: string; id: string; email: string }; success: boolean };
  kakao: { userInfo: { name: string; id: string; email: string; picture: string }; success: boolean };
  google: { userInfo: { name: string; id: string; email: string; picture: string }; success: boolean };
  naver: { userInfo: { name: string; id: string; email: string; picture: string }; success: boolean }
} = {
  google: {
    success: true,
    userInfo: {
      id: 'google_test_id',
      email: 'test.google@example.com',
      name: 'Google Test User',
      picture: 'https://example.com/mock-profile.jpg'
    }
  },
  apple: {
    success: true,
    userInfo: {
      id: 'apple_test_id',
      email: 'test.apple@example.com',
      name: 'Apple Test User'
    }
  },
  kakao: {
    success: true,
    userInfo: {
      id: 'kakao_test_id',
      email: 'test.kakao@example.com',
      name: 'Kakao Test User',
      picture: 'https://example.com/mock-profile.jpg'
    }
  },
  naver: {
    success: true,
    userInfo: {
      id: 'naver_test_id',
      email: 'test.naver@example.com',
      name: 'Naver Test User',
      picture: 'https://example.com/mock-profile.jpg'
    }
  }
};
