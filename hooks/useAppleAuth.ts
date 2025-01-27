import * as AppleAuthentication from "expo-apple-authentication";


export const useAppleAuth = (onAppleLogin: (credential: AppleAuthentication.AppleAuthenticationCredential) => Promise<void>) => {
  const handleAppleSignIn = async () => {
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
  };

  return { handleAppleSignIn };
};

