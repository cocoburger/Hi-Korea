// sections/PhotoSpotsSection.tsx
import { useState } from "react";
import { View, YStack, useWindowDimensions } from "tamagui";
import { Section } from "@/components/common/layout/Section";
import { MoreButton } from "@/components/home/MoreButton";
import { PhotoSpotCard } from "@/components/home/PhotoSpotCard";
import { CategoryFilter } from "@/components/home/CategoryFilter";
import { LayoutToggleButton } from "@/components/ui/LayoutToggleButton";
import { FlatList } from "react-native";
import { PhotoSpot, ResponsiveStyles } from "@/types/home";
import { PHOTO_CATEGORIES } from "@/data/constants/categories";
import { FilterType, LayoutType } from "@/types/component";

type PhotoSpotsSectionProps = {
  styles: ResponsiveStyles;
  data: PhotoSpot[];
  layoutType?: LayoutType;
  availableFilters?: FilterType[];
};

export function PhotoSpotsSection({
  styles,
  data,
  layoutType = "carousel",
  availableFilters,
}: PhotoSpotsSectionProps) {
  const { width } = useWindowDimensions();
  const [selectedCategory, setSelectedCategory] = useState(1);

  // 반응형 카드 너비 계산
  const CARD_WIDTH = layoutType === "grid" ? width * 0.45 : width * 0.7;

  return (
    <Section
      title='인기 포토 스팟'
      styles={styles}
      rightElement={
        <View flexDirection='row' gap={styles.spacing.gap}>
          <LayoutToggleButton
            type={layoutType === "grid" ? "carousel" : "grid"}
            isActive={layoutType === "grid"}
            onPress={() => console.log("Navigate to photo spots")}
          />
          <MoreButton
            onPress={() => console.log("Navigate to photo spots")}
            styles={styles}
          />
        </View>
      }
    >
      <YStack gap={styles.spacing.gap}>
        <CategoryFilter
          categories={PHOTO_CATEGORIES}
          selected={selectedCategory}
          onSelect={setSelectedCategory}
          styles={styles}
        />

        {layoutType === "carousel" ? (
          <FlatList
            horizontal
            data={data}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: styles.spacing.gap,
              paddingHorizontal: styles.spacing.screenPadding,
            }}
            renderItem={({ item }) => (
              <PhotoSpotCard
                data={item}
                styles={styles}
                width={CARD_WIDTH}
                aspectRatio={3 / 4}
              />
            )}
            keyExtractor={(item) => item.id.toString()}
          />
        ) : (
          <View
            flexDirection='row'
            flexWrap='wrap'
            justifyContent='space-between'
            paddingHorizontal={styles.spacing.screenPadding}
            gap={styles.spacing.gap}
          >
            {data.map((spot) => (
              <View key={spot.id} width={CARD_WIDTH}>
                <PhotoSpotCard
                  data={spot}
                  styles={styles}
                  width={CARD_WIDTH}
                  aspectRatio={3 / 4}
                />
              </View>
            ))}
          </View>
        )}
      </YStack>
    </Section>
  );
}

// 그리드 레이아웃 컴포넌트
const SpotGrid = ({
  data,
  styles,
}: {
  data: PhotoSpot[];
  styles: ResponsiveStyles;
}) => (
  <View
    style={{
      flexDirection: "row",
      flexWrap: "wrap",
      gap: styles.spacing.gap,
      paddingHorizontal: styles.spacing.screenPadding,
    }}
  >
    {data.map((spot) => (
      <View style={{ width: "48%" }} key={spot.id}>
        <PhotoSpotCard data={spot} styles={styles} />
      </View>
    ))}
  </View>
);
