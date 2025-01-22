import { SecurityLevel, UserInfo } from '@/types/user';

export const createTestUserInfo = (
    partialUserInfo: Partial<UserInfo> = {}
): UserInfo => ({
  gender: 'other',
  country: 'South Korea',
  securityLevel: 'medium',
  name: 'Test User',
  age: 28,
  email: 'test@example.com',
  preferredLanguage: ['ko', 'en'],
  travelPreferences: {
    preferredDestinations: ['Seoul', 'Busan', 'Jeju'],
    transportationPreference: 'public',
    accommodationType: ['hotel', 'guesthouse']
  },
  lastLoginDate: new Date(),
  accountCreationDate: new Date('2024-01-01'),
  isEmailVerified: true,
  ...partialUserInfo // 부분적인 오버라이드 허용
});


export const mapOAuthToUserInfo = (
    oauthInfo: any,
    provider: string
): UserInfo => {
  // OAuth 제공자별 기본값 매핑
  const providerDefaults: Partial<UserInfo> = {
    google: {
      securityLevel: 'medium' as SecurityLevel,
      isEmailVerified: true,
    },
    apple: {
      securityLevel: 'medium' as SecurityLevel,
      isEmailVerified: true,
    }
  }[provider] || {};

  // OAuth 응답에서 추출할 수 있는 데이터 매핑
  const mappedData: Partial<UserInfo> = {
    email: oauthInfo.email,
    name: oauthInfo.name,
    // picture는 UserInfo 타입에 없으므로 제외
  };

  // 테스트 데이터와 병합
  return createTestUserInfo({
    ...providerDefaults,
    ...mappedData,
  });
}
