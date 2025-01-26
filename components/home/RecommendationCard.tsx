import { Stack, YStack, XStack, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Recommendation, ResponsiveStyles } from "@/types/home";

interface RecommendationCardProps {
  data: Recommendation;
  styles: ResponsiveStyles;
}

export function RecommendationCard({ data, styles }: RecommendationCardProps) {
  return (
    <Stack
      width={250}
      backgroundColor='$background'
      borderRadius='$4'
      shadowColor='$shadowColor'
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      marginRight={styles.spacing.gap}
    >
      <Stack height={140} backgroundColor='$gray2' borderRadius='$4' />
      <YStack padding={styles.spacing.padding} gap='$1'>
        <Text
          fontWeight='bold'
          numberOfLines={1}
          fontSize={styles.fontSize.body}
        >
          {data.title}
        </Text>
        <Text
          fontSize={styles.fontSize.small}
          color='$gray11'
          numberOfLines={2}
        >
          {data.description}
        </Text>
        <XStack alignItems='center' gap='$2' marginTop='$1'>
          <Ionicons
            name='location'
            size={styles.iconSize.small}
            color='#666666'
          />
          <Text fontSize={styles.fontSize.small} color='$gray10'>
            {data.location}
          </Text>
        </XStack>
      </YStack>
    </Stack>
  );
}
