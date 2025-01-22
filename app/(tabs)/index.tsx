import React, { useState, useRef } from "react";
import {
  ScrollView,
  Platform,
  useWindowDimensions,
  Animated,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { XStack, YStack, Text, Input, Stack, Button } from "tamagui";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { Chip } from "@/components/ui/Chip";

// 카테고리 데이터
const PHOTO_CATEGORIES = [
  { id: 1, title: "전체", variant: "blue" },
  { id: 2, title: "인기", variant: "pink" },
  { id: 3, title: "신규", variant: "green" },
  { id: 4, title: "추천", variant: "purple" },
] as const;

// 반응형 스타일 정의
const getResponsiveStyles = (width: number) => {
  // Extra Small: 0-380px
  if (width < 380) {
    return {
      fontSize: {
        title: 20,
        subtitle: 16,
        body: 14,
        small: 12,
      },
      spacing: {
        padding: "$3",
        gap: "$2",
      },
      iconSize: {
        large: 22,
        medium: 18,
        small: 14,
      },
      cardWidth: "45%",
    };
  }
  // Small: 381-480px
  else if (width < 480) {
    return {
      fontSize: {
        title: 24,
        subtitle: 20,
        body: 16,
        small: 14,
      },
      spacing: {
        padding: "$4",
        gap: "$3",
      },
      iconSize: {
        large: 24,
        medium: 20,
        small: 16,
      },
      cardWidth: "47%",
    };
  }
  // Medium: 481px 이상
  return {
    fontSize: {
      title: 28,
      subtitle: 24,
      body: 20,
      small: 16,
    },
    spacing: {
      padding: "$5",
      gap: "$4",
    },
    iconSize: {
      large: 26,
      medium: 22,
      small: 18,
    },
    cardWidth: "48%",
  };
};

// 스타일 타입 정의
type ResponsiveStyles = ReturnType<typeof getResponsiveStyles>;
type CardProps = {
  styles: ResponsiveStyles;
};

const RecommendationCard = ({ styles }: CardProps) => (
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
    <YStack padding={styles.spacing.padding} space='$1'>
      <Text fontWeight='bold' numberOfLines={1} fontSize={styles.fontSize.body}>
        추천 장소 이름
      </Text>
      <Text fontSize={styles.fontSize.small} color='$gray11' numberOfLines={2}>
        간단한 설명이 들어갑니다.
      </Text>
      <XStack alignItems='center' space='$2' marginTop='$1'>
        <Ionicons
          name='location'
          size={styles.iconSize.small}
          color='#666666'
        />
        <Text fontSize={styles.fontSize.small} color='$gray10'>
          위치 정보
        </Text>
      </XStack>
    </YStack>
  </Stack>
);

const MoreButton = ({
  onPress,
  styles,
}: CardProps & { onPress: () => void }) => (
  <Button
    backgroundColor='transparent'
    paddingHorizontal='$3'
    pressStyle={{ opacity: 0.8 }}
    onPress={onPress}
  >
    <XStack alignItems='center' space='$1'>
      <Text color='$mint9' fontSize={styles.fontSize.body}>
        더보기
      </Text>
      <Ionicons
        name='chevron-forward'
        size={styles.iconSize.small}
        color='$mint9'
      />
    </XStack>
  </Button>
);

type PhotoSpotCardProps = CardProps & {
  width: number;
};

const PhotoSpotCard = ({ styles, width }: PhotoSpotCardProps) => (
  <Stack
    width={width - 32}
    backgroundColor='$background'
    borderRadius='$4'
    shadowColor='$shadowColor'
    shadowOffset={{ width: 0, height: 2 }}
    shadowOpacity={0.1}
    shadowRadius={8}
    marginRight={styles.spacing.gap}
  >
    <Stack aspectRatio={1} backgroundColor='$gray2' borderRadius='$4' />
    <YStack padding={styles.spacing.padding} space='$1'>
      <Text fontWeight='bold' numberOfLines={1} fontSize={styles.fontSize.body}>
        포토 스팟 이름
      </Text>
      <XStack alignItems='center' space='$2'>
        <Ionicons name='heart' size={styles.iconSize.small} color='#666666' />
        <Text fontSize={styles.fontSize.small} color='$gray10'>
          좋아요 수
        </Text>
      </XStack>
    </YStack>
  </Stack>
);

const RestaurantCard = ({ styles }: CardProps) => (
  <XStack
    backgroundColor='$background'
    borderRadius='$4'
    padding={styles.spacing.padding}
    shadowColor='$shadowColor'
    shadowOffset={{ width: 0, height: 2 }}
    shadowOpacity={0.1}
    shadowRadius={8}
  >
    <Stack width={96} height={96} backgroundColor='$gray2' borderRadius='$4' />
    <YStack marginLeft={styles.spacing.gap} flex={1}>
      <Text fontWeight='bold' fontSize={styles.fontSize.body}>
        맛집 이름
      </Text>
      <Text fontSize={styles.fontSize.small} color='$gray11' marginTop='$1'>
        간단한 설명
      </Text>
      <Text fontSize={styles.fontSize.small} color='$gray10' marginTop='$2'>
        위치 정보
      </Text>
    </YStack>
  </XStack>
);

const TravelCourseCard = ({ styles }: CardProps) => (
  <Stack
    backgroundColor='$background'
    borderRadius='$4'
    padding={styles.spacing.padding}
    shadowColor='$shadowColor'
    shadowOffset={{ width: 0, height: 2 }}
    shadowOpacity={0.1}
    shadowRadius={8}
  >
    <Stack
      height={128}
      backgroundColor='$gray2'
      borderRadius='$4'
      marginBottom='$3'
    />
    <Text fontWeight='bold' fontSize={styles.fontSize.body}>
      여행 코스 제목
    </Text>
    <Text fontSize={styles.fontSize.small} color='$gray11' marginTop='$1'>
      코스 설명
    </Text>
  </Stack>
);

export default function HomeScreen() {
  const [selectedCategory, setSelectedCategory] = useState(1);
  const scrollX = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const bottomTabHeight = Platform.OS === "ios" ? 85 : 65;
  const styles = getResponsiveStyles(width);

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: "#F9FAFB" }}
      edges={["top"]}
    >
      {/* Top Bar */}
      <XStack
        backgroundColor='$background'
        paddingHorizontal={styles.spacing.padding}
        paddingVertical={styles.spacing.padding}
        justifyContent='space-between'
        alignItems='center'
        shadowColor='$shadowColor'
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
      >
        <Text fontSize={styles.fontSize.title} fontWeight='bold'>
          로고
        </Text>
        <XStack space={styles.spacing.gap}>
          <Ionicons
            name='location-outline'
            size={styles.iconSize.large}
            color='$mint9'
          />
          <Ionicons
            name='notifications-outline'
            size={styles.iconSize.large}
            color='#666666'
          />
        </XStack>
      </XStack>

      {/* Search Bar */}
      <YStack padding={styles.spacing.padding}>
        <XStack
          backgroundColor='$background'
          borderRadius={30}
          paddingHorizontal={styles.spacing.padding}
          paddingVertical='$2'
          alignItems='center'
          shadowColor='$shadowColor'
          shadowOffset={{ width: 0, height: 2 }}
          shadowOpacity={0.1}
          shadowRadius={8}
        >
          <Ionicons
            name='search'
            size={styles.iconSize.medium}
            color='#999999'
          />
          <Input
            flex={1}
            marginLeft='$2'
            placeholder='맛집, 명소, 체험을 검색해보세요'
            borderWidth={0}
            backgroundColor='transparent'
            fontSize={styles.fontSize.body}
          />
        </XStack>
      </YStack>

      {/* Main Content */}
      <ScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{
          paddingBottom: bottomTabHeight + insets.bottom,
        }}
      >
        <YStack padding={styles.spacing.padding} space={styles.spacing.gap}>
          {/* Today's Recommendations */}
          <YStack>
            <Text
              fontSize={styles.fontSize.title}
              fontWeight='bold'
              marginBottom={styles.spacing.gap}
            >
              오늘의 추천
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {[1, 2, 3].map((i) => (
                <RecommendationCard key={i} styles={styles} />
              ))}
            </ScrollView>
          </YStack>

          {/* Popular Photo Spots */}
          <YStack>
            <Text
              fontSize={styles.fontSize.title}
              fontWeight='bold'
              marginBottom={styles.spacing.gap}
            >
              인기 포토 스팟
            </Text>
            {/* Chip Buttons */}
            <YStack marginBottom={styles.spacing.gap}>
              <XStack alignItems='center'>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={{ flex: 1 }}
                  contentContainerStyle={{
                    gap: 8,
                    flexDirection: "row",
                  }}
                >
                  {PHOTO_CATEGORIES.map((category) => (
                    <Chip
                      key={category.id}
                      label={category.title}
                      variant={category.variant}
                      size='medium'
                      isSelected={selectedCategory === category.id}
                      onPress={() => setSelectedCategory(category.id)}
                    />
                  ))}
                </ScrollView>
                <MoreButton
                  styles={styles}
                  onPress={() => {
                    // TODO: 상세 목록 페이지로 이동
                    console.log("Navigate to detail page");
                  }}
                />
              </XStack>
            </YStack>
            {/* Photo Spots Slider */}
            <Animated.ScrollView
              horizontal
              pagingEnabled
              showsHorizontalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                { useNativeDriver: true }
              )}
              scrollEventThrottle={16}
            >
              {[1, 2, 3, 4].map((i) => (
                <PhotoSpotCard key={i} styles={styles} width={width} />
              ))}
            </Animated.ScrollView>
          </YStack>

          {/* Trending Restaurants */}
          <YStack>
            <Text
              fontSize={styles.fontSize.title}
              fontWeight='bold'
              marginBottom={styles.spacing.gap}
            >
              요즘 뜨는 맛집
            </Text>
            <YStack space={styles.spacing.gap}>
              {[1, 2, 3].map((i) => (
                <RestaurantCard key={i} styles={styles} />
              ))}
            </YStack>
          </YStack>

          {/* Recommended Travel Plans */}
          <YStack>
            <Text
              fontSize={styles.fontSize.title}
              fontWeight='bold'
              marginBottom={styles.spacing.gap}
            >
              추천 여행 코스
            </Text>
            <YStack space={styles.spacing.gap}>
              {[1, 2].map((i) => (
                <TravelCourseCard key={i} styles={styles} />
              ))}
            </YStack>
          </YStack>
        </YStack>
      </ScrollView>
    </SafeAreaView>
  );
}
