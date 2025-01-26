import { FilterType } from "@/types/component";

// 포토 스팟 필터 옵션
export const PHOTO_FILTERS: FilterType[] = [
  {
    id: 1,
    label: "인기 스팟",
    value: "popular",
  },
  {
    id: 2,
    label: "히든 스팟",
    value: "hidden_gem",
  },
  {
    id: 3,
    label: "봄 맞이",
    value: "spring",
  },
  {
    id: 4,
    label: "겨울 풍경",
    value: "winter",
  },
  {
    id: 5,
    label: "도시 배경",
    value: "urban",
  },
  {
    id: 6,
    label: "자연 경관",
    value: "nature",
  },
  {
    id: 7,
    label: "휠체어 가능",
    value: "wheelchair_accessible",
  },
  {
    id: 8,
    label: "유아동 동반",
    value: "stroller_friendly",
  },
];

// 현재 선택된 필터 샘플
export const SELECTED_FILTERS: FilterType[] = [
  PHOTO_FILTERS[0], // 인기 스팟
  PHOTO_FILTERS[4], // 도시 배경
];
