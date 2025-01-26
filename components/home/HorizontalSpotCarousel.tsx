// components/home/HorizontalSpotCarousel.tsx
import { FlatList } from "react-native";
import { PhotoSpotCard } from "@/components/home/PhotoSpotCard";
import { PhotoSpot } from "@/types/home";
import { ResponsiveStyles } from "@/types/home";

interface HorizontalSpotCarouselProps {
  data: PhotoSpot[];
  styles: ResponsiveStyles;
}

export const HorizontalSpotCarousel = ({
  data,
  styles,
}: HorizontalSpotCarouselProps) => {
  return (
    <FlatList
      horizontal
      data={data}
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{
        gap: styles.spacing.gap,
        paddingHorizontal: styles.spacing.screenPadding,
      }}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <PhotoSpotCard data={item} styles={styles} width={300} />
      )}
      getItemLayout={(data, index) => ({
        length: 300 + 16,
        offset: (300 + 16) * index,
        index,
      })}
    />
  );
};
