import { Section } from "@/components/common/layout/Section";
import { ResponsiveStyles, Restaurant } from "@/types/home";
import { YStack, Text, ScrollView, View, Image } from "tamagui";
import { FilterType, SectionConfig } from "@/types/component";

type RestaurantsSectionProps = {
  styles: ResponsiveStyles;
  data: Restaurant[];
  showFilters?: boolean;
  activeFilters?: FilterType[];
  config?: SectionConfig;
};

export function RestaurantsSection({ styles, data }: RestaurantsSectionProps) {
  return (
    <Section title='요즘 뜨는 맛집' styles={styles}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <YStack flexDirection='row' gap={styles.spacing.gap}>
          {data.map((restaurant) => (
            <View
              key={restaurant.id}
              style={{
                width: 200,
                marginRight: styles.spacing.gap,
              }}
            >
              <Image
                source={{ uri: restaurant.imageUrl }}
                style={{
                  width: "100%",
                  height: 120,
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />
              <Text fontWeight='600' fontSize={16}>
                {restaurant.name}
              </Text>
              <Text fontSize={14} color='$gray10'>
                {restaurant.description}
              </Text>
            </View>
          ))}
        </YStack>
      </ScrollView>
    </Section>
  );
}
