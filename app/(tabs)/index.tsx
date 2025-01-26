import React from "react";
import { ScrollView, Platform, useWindowDimensions } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { YStack } from "tamagui";

import { RecommendationsSection } from "./sections/RecommendationsSection";
import { PhotoSpotsSection } from "./sections/PhotoSpotsSection";
import { RestaurantsSection } from "./sections/RestaurantsSection";
import { TravelCoursesSection } from "./sections/TravelCoursesSection";
import { TopBar } from "@/components/home/TopBar";
import { SearchBar } from "@/components/home/SearchBar";
import { getResponsiveStyles } from "@/utils/styles";
import {
  MOCK_RECOMMENDATIONS,
  MOCK_PHOTO_SPOTS,
  MOCK_RESTAURANTS,
  MOCK_TRAVEL_COURSES,
} from "@/data/mock/home";
import { ExperienceTypes } from "./sections/ExperienceTypes";
import { PHOTO_FILTERS, SELECTED_FILTERS } from "@/data/constants/filters";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const bottomTabHeight = Platform.OS === "ios" ? 85 : 65;
  const styles = getResponsiveStyles(width);

  return (
      <SafeAreaView
          style={ { flex: 1, backgroundColor: "#F9FAFB" } }
          edges={ ["top"] }
      >
        <TopBar styles={ styles } />

        <SearchBar
            styles={ styles }
            placeholder='어디로 여행가세요? 지역, 명소, 테마 검색'
        />

        <ScrollView
            style={ { flex: 1 } }
            contentContainerStyle={ {
              paddingBottom: bottomTabHeight + insets.bottom,
            } }
        >
          <YStack
              padding={ styles.spacing.padding }
              gap={ 16 }
          >
            {/* 체험 유형 퀵 메뉴 추가 */ }
            <ExperienceTypes styles={ styles } />

            <RecommendationsSection
                styles={ styles }
                data={ MOCK_RECOMMENDATIONS }
                variant="full"
                config={ {
                  showHeader: true,
                  maxItems: 6
                } }
            />

            <PhotoSpotsSection
                styles={ styles }
                data={ MOCK_PHOTO_SPOTS }
                layoutType="grid"
                availableFilters={ PHOTO_FILTERS }
            />

            <RestaurantsSection
                styles={ styles }
                data={ MOCK_RESTAURANTS }
                showFilters
                activeFilters={ SELECTED_FILTERS }
            />

            <TravelCoursesSection
                styles={ styles }
                data={ MOCK_TRAVEL_COURSES }
                variant='timeline'
            />
          </YStack>
        </ScrollView>
      </SafeAreaView>
  );
}
