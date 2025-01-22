import React from "react";
import { YStack, Text, Button, Image } from "tamagui";

interface FeaturedCardProps {
  image: string;
  title: string;
  description: string;
  onPress: () => void;
}

export function FeaturedCard({
  image,
  title,
  description,
  onPress,
}: FeaturedCardProps) {
  return (
    <Button
      onPress={onPress}
      width={250}
      height={200}
      padding={0}
      borderRadius='$4'
      overflow='hidden'
      backgroundColor='$gray1'
      pressStyle={{ opacity: 0.8 }}
    >
      <YStack flex={1}>
        <Image
          source={{ uri: image }}
          width='100%'
          height={120}
          resizeMode='cover'
        />
        <YStack padding='$3' space='$1'>
          <Text fontSize='$5' fontWeight='600' numberOfLines={1}>
            {title}
          </Text>
          <Text fontSize='$3' color='$gray11' numberOfLines={2}>
            {description}
          </Text>
        </YStack>
      </YStack>
    </Button>
  );
}
