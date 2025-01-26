import {
  VariantType,
  LayoutType,
  FilterType,
  SectionConfig,
} from "./component";
import { Ionicons } from "@expo/vector-icons";
import { ChipVariant } from "@/components/ui/Chip";

// 공통 응답 형식
export type BaseResponse<T> = {
  data: T[];
  total: number;
  page: number;
};

export type Category = {
  id: number;
  title: string;
  variant: ChipVariant;
};

export type Recommendation = {
  id: number;
  title: string;
  description: string;
  location: string;
  imageUrl: string;
  variant: VariantType;
};

export type PhotoSpot = {
  id: number;
  title: string;
  imageUrl: string;
  likes: number;
  distance?: number; // 선택적 거리 정보
  tags?: string[]; // 태그 배열
  // ... 기타 필드
};

export type Restaurant = {
  id: number;
  name: string;
  description: string;
  location: string;
  imageUrl: string;
};

export type TravelCourse = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
};

// 반응형 스타일 타입
export type ResponsiveStyles = {
  fontSize: {
    title: number;
    subtitle: number;
    body: number;
    small: number;
    caption?: number;
  };
  spacing: {
    padding: number;
    gap: number;
    screenPadding: number;
    cardGap: number;
  };
  iconSize: {
    large: number;
    medium: number;
    small: number;
  };
  cardWidth: string;
  layout: {
    card: LayoutType;
    section: VariantType;
  };
};

export type PhotoSpotSectionProps = {
  layoutType?: LayoutType;
  filters?: FilterType[];
  sectionConfig?: SectionConfig;
};

export type ExperienceType = {
  id: number;
  icon: string;
  title: string;
  description: string;
};

export type IconName =
  | "camera-outline"
  | "restaurant-outline"
  | "walk-outline"
  | "leaf-outline"
  | "bed-outline"
  | "calendar-outline"
  // 다른 Ionicons 이름 추가
  | keyof typeof Ionicons.glyphMap; // Ionicons의 모든 가능한 이름 허용
