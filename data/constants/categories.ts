import { Category } from "@/types/home";
import { FilterType } from "@/types/component";

export const PHOTO_CATEGORIES: FilterType[] = [
  {
    id: 1,
    label: "전체",
    value: "all",
    variant: "blue"
  },
  {
    id: 2,
    label: "인기",
    value: "popular",
    variant: "pink"
  },
  {
    id: 3,
    label: "신규",
    value: "new",
    variant: "green"
  },
  {
    id: 4,
    label: "추천",
    value: "recommended",
    variant: "purple"
  },
];
