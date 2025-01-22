import { createFont, createTamagui, createTokens, isWeb } from "tamagui";

// 시스템 폰트 설정
const systemFont = createFont({
  family: isWeb ? "Helvetica, Arial, sans-serif" : "System",
  size: {
    1: 12,
    2: 14,
    3: 15,
    4: 16,
    5: 18,
    6: 20,
    7: 22,
    8: 24,
    9: 28,
    10: 32,
  },
  lineHeight: {
    1: 20,
    2: 22,
    3: 24,
    4: 24,
    5: 26,
    6: 28,
    7: 30,
    8: 32,
    9: 36,
    10: 40,
  },
  weight: {
    1: "300",
    2: "400",
    3: "500",
    4: "600",
    5: "700",
  },
  letterSpacing: {
    1: 0,
    2: -0.5,
    3: -0.75,
    4: -1,
  },
  // 네이티브 전용 폰트 페이스 설정
  face: {
    300: { normal: "SpaceMono" },
    400: { normal: "SpaceMono" },
    500: { normal: "SpaceMono" },
    600: { normal: "SpaceMono" },
    700: { normal: "SpaceMono" },
  },
});

// 토큰 설정
const size = {
  0: 0,
  1: 4,
  2: 8,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  7: 28,
  8: 32,
  9: 36,
  10: 40,
  // 기본 크기를 16으로 설정 (size[4]와 동일)
  true: 16,
};

export const tokens = createTokens({
  size,
  space: {
    ...size,
    "-1": -4,
    "-2": -8,
    // space에도 true 키 추가
    true: 16,
  },
  radius: {
    0: 0,
    1: 4,
    2: 8,
    3: 12,
    4: 16,
    5: 20,
    true: 8, // 기본값으로 radius[2] 사용
  },
  zIndex: {
    0: 0,
    1: 100,
    2: 200,
    3: 300,
    4: 400,
    5: 500,
    true: 200, // 기본값으로 zIndex[2] 사용
  },
  color: {
    white: "#fff",
    black: "#000",

    // 기존 테마 색상 유지
    primary: "#52BEB5",
    secondary: "#73B2D9",
    accent: "#D94C9E",
    error: "#CE4537",
  },
});

const config = createTamagui({
  fonts: {
    heading: systemFont,
    body: systemFont,
  },
  tokens,

  // 테마 설정
  themes: {
    light: {
      background: "#fff",
      color: tokens.color.black,
      primary: "#4285F4", // Google 블루
      primaryDark: "#3367D6", // 더 진한 블루
      secondary: "#73B2D9",
      accent: "#34A853", // Google 그린
      error: "#EA4335", // Google 레드
    },
    dark: {
      background: "#111",
      color: tokens.color.white,
      primary: "#4285F4",
      primaryDark: "#3367D6",
      secondary: "#73B2D9",
      accent: "#34A853",
      error: "#EA4335",
    },
  },

  // 미디어 쿼리 설정
  media: {
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: "none" },
    pointerCoarse: { pointer: "coarse" },
  },

  // 단축 속성 설정
  shorthands: {
    px: "paddingHorizontal",
    py: "paddingVertical",
    mx: "marginHorizontal",
    my: "marginVertical",
    f: "flex",
    w: "width",
    h: "height",
    bg: "background",
  } as const,
});

type AppConfig = typeof config;

declare module "tamagui" {
  interface TamaguiCustomConfig extends AppConfig {}

  interface TypeOverride {
    groupNames(): "card";
  }
}

export default config;
