import {
  Recommendation,
  PhotoSpot,
  Restaurant,
  TravelCourse,
} from "@/types/home";

export const MOCK_RECOMMENDATIONS: Recommendation[] = [
  {
    id: 1,
    title: "경복궁",
    description: "조선시대 대표 궁궐, 근정전과 경회루",
    location: "서울 종로구",
    imageUrl: "https://example.com/gyeongbokgung.jpg",
  },
  {
    id: 2,
    title: "남산서울타워",
    description: "서울의 상징적인 랜드마크",
    location: "서울 용산구",
    imageUrl: "https://example.com/namsan.jpg",
  },
  {
    id: 3,
    title: "북촌한옥마을",
    description: "전통 한옥이 보존된 문화거리",
    location: "서울 종로구",
    imageUrl: "https://example.com/bukchon.jpg",
  },
];

export const MOCK_PHOTO_SPOTS: PhotoSpot[] = [
  {
    id: 1,
    title: "인생사진 스팟, 서울숲",
    likes: 2840,
    imageUrl: "https://example.com/seoulforest.jpg",
  },
  {
    id: 2,
    title: "익선동 골목길",
    likes: 1950,
    imageUrl: "https://example.com/ikseon.jpg",
  },
  {
    id: 3,
    title: "하늘공원",
    likes: 1580,
    imageUrl: "https://example.com/skypark.jpg",
  },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: 1,
    name: "통인시장 길거리 음식",
    description: "도시락카페와 다양한 분식",
    location: "서울 종로구",
    imageUrl: "https://example.com/tongin.jpg",
  },
  {
    id: 2,
    name: "광장시장 맛집거리",
    description: "유명한 빈대떡과 마약김밥",
    location: "서울 중구",
    imageUrl: "https://example.com/gwangjang.jpg",
  },
  {
    id: 3,
    name: "을지로 노포",
    description: "오래된 맛집들의 천국",
    location: "서울 중구",
    imageUrl: "https://example.com/euljiro.jpg",
  },
];

export const MOCK_TRAVEL_COURSES: TravelCourse[] = [
  {
    id: 1,
    title: "서울 역사 탐방",
    description: "경복궁 → 북촌 → 인사동 → 광화문",
    imageUrl: "https://example.com/history.jpg",
  },
  {
    id: 2,
    title: "서울 야경 코스",
    description: "남산타워 → 반포대교 → DDP",
    imageUrl: "https://example.com/night.jpg",
  },
];
