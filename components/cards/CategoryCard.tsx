import React from "react";
import { YStack, Text, Button } from "tamagui";
import { Ionicons } from "@expo/vector-icons";

interface CategoryCardProps {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  onPress: () => void;
}

export function CategoryCard({ icon, title, onPress }: CategoryCardProps) {
  return (
    <Button
      onPress={onPress}
      backgroundColor='$gray1'
      borderRadius='$4'
      width={80}
      height={80}
      padding='$2'
      pressStyle={{ opacity: 0.8 }}
    >
      <YStack flex={1} alignItems='center' justifyContent='center' space='$2'>
        <Ionicons name={icon} size={32} color='$primary' />
        <Text fontSize='$3' color='$gray12'>
          {title}
        </Text>
      </YStack>
    </Button>
  );
}
