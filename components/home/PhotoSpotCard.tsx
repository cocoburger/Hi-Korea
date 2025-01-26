import { Stack, YStack, XStack, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "react-native";
import { PhotoSpot, ResponsiveStyles } from "@/types/home";

interface PhotoSpotCardProps {
  data: PhotoSpot;
  styles: ResponsiveStyles;
  width?: number;
  aspectRatio?: number;
}

export function PhotoSpotCard({
  data,
  styles,
  width,
  aspectRatio = 1,
}: PhotoSpotCardProps) {
  return (
    <Stack
      width={width}
      backgroundColor='$background'
      borderRadius='$4'
      overflow='hidden'
      shadowColor='$shadowColor'
      shadowOffset={{ width: 0, height: 2 }}
      shadowOpacity={0.1}
      shadowRadius={8}
      pressStyle={{ scale: 0.98, opacity: 0.9 }} // 터치 인터랙션 추가
    >
      {/* 이미지 섹션 */}
      <Image
        source={{ uri: data.imageUrl }}
        style={{
          width: "100%",
          aspectRatio: aspectRatio,
          borderRadius: styles.spacing.gap,
        }}
        resizeMode='cover'
      />

      {/* 정보 표시 섹션 */}
      <YStack padding={16} gap={8}>
        <Text
          numberOfLines={1}
          fontSize={styles.fontSize.body}
          fontWeight='600'
          color='$gray12'
          ellipsizeMode='tail'
        >
          {data.title}
        </Text>

        <XStack alignItems='center' gap={4}>
          <Ionicons name='heart' size={14} color='$red9' />
          <Text fontSize={styles.fontSize.caption} color='$gray10'>
            {data.likes.toLocaleString()}
          </Text>

          {/* 거리 표시 추가 */}
          {data.distance && (
            <>
              <Text color='$gray8' marginLeft={8}>
                •
              </Text>
              <Text fontSize={styles.fontSize.caption} color='$gray10'>
                {data.distance}km
              </Text>
            </>
          )}
        </XStack>

        {/* 태그 표시 추가 */}
        {data.tags && (
          <XStack flexWrap='wrap' gap={4}>
            {data.tags.map((tag) => (
              <Text
                key={tag}
                fontSize={styles.fontSize.caption}
                color='$blue10'
                paddingHorizontal={8}
                paddingVertical={4}
                backgroundColor='$blue3'
                borderRadius='$2'
              >
                #{tag}
              </Text>
            ))}
          </XStack>
        )}
      </YStack>
    </Stack>
  );
}
