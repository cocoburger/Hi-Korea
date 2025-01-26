import React from "react";
import { XStack, YStack, Text, Button, Image } from "tamagui";
import { IconSymbol } from "../ui/IconSymbol";

interface RecommendationCardProps {
  image: string;
  title: string;
  category: string;
  rating: number;
  reviews: number;
  onPress: () => void;
}

export function RecommendationCard({
  image,
  title,
  category,
  rating,
  reviews,
  onPress,
}: RecommendationCardProps) {
  return (
    <Button
      onPress={onPress}
      width='100%'
      height={100}
      padding={0}
      borderRadius='$4'
      overflow='hidden'
      backgroundColor='$gray1'
      pressStyle={{ opacity: 0.8 }}
    >
      <XStack flex={1}>
        <Image
          source={{ uri: image }}
          width={100}
          height='100%'
          resizeMode='cover'
        />
        <YStack flex={1} padding='$3' justifyContent='space-between'>
          <YStack gap='$1'>
            <Text fontSize='$5' fontWeight='600' numberOfLines={1}>
              {title}
            </Text>
            <Text fontSize='$3' color='$gray11'>
              {category}
            </Text>
          </YStack>
          <XStack alignItems='center' gap='$2'>
            <IconSymbol name='star.fill' size={16} color='$yellow10' />
            <Text fontSize='$3' fontWeight='600'>
              {rating}
            </Text>
            <Text fontSize='$3' color='$gray11'>
              ({reviews.toLocaleString()} reviews)
            </Text>
          </XStack>
        </YStack>
      </XStack>
    </Button>
  );
}
