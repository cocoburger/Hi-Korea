// sections/TravelCoursesSection.tsx

import { VariantType } from "@/types/component";
import { ResponsiveStyles, TravelCourse } from "@/types/home";
import { Section } from "@/components/common/layout/Section";
import { YStack, XStack, Stack, Button, Text } from "tamagui";
import { View } from "react-native";
import { Chip } from "@/components/ui/Chip";
import { Ionicons } from "@expo/vector-icons";

type ExtendedTravelCourse = TravelCourse & {
  duration?: string;
  highlights?: string[];
};

type TravelCoursesSectionProps = {
  styles: ResponsiveStyles;
  data: ExtendedTravelCourse[];
  variant?: VariantType; // 추가된 prop
};

export function TravelCoursesSection({
  styles,
  data,
  variant = "list", // 'list' | 'timeline'
}: TravelCoursesSectionProps & { variant?: "list" | "timeline" }) {
  return (
    <Section
      title='추천 여행 코스'
      styles={styles}
      rightElement={
        <VariantToggle
          currentVariant={variant}
          onToggle={() => console.log("Toggle view")}
        />
      }
    >
      {variant === "list" ? (
        <CourseList data={data} styles={styles} />
      ) : (
        <TimelineView data={data} styles={styles} />
      )}
    </Section>
  );
}

// 타임라인 뷰 컴포넌트
const TimelineView = ({
  data,
  styles,
}: {
  data: ExtendedTravelCourse[];
  styles: ResponsiveStyles;
}) => (
  <YStack gap={24} paddingHorizontal={styles.spacing.screenPadding}>
    {data.map((course, index) => (
      <View key={course.id} style={{ flexDirection: "row" }}>
        {/* 타임라인 연결선 */}
        <View style={{ width: 40, alignItems: "center" }}>
          {index !== data.length - 1 && (
            <View
              style={{
                width: 2,
                flex: 1,
                backgroundColor: "#e5e7eb",
                marginVertical: 8,
              }}
            />
          )}
          <View
            style={{
              width: 16,
              height: 16,
              borderRadius: 8,
              backgroundColor: "#3b82f6",
              borderWidth: 3,
              borderColor: "white",
            }}
          />
        </View>

        {/* 코스 내용 */}
        <View style={{ flex: 1, paddingBottom: 32 }}>
          <Text fontWeight='600' fontSize={16}>
            {course.title}
          </Text>
          <Text color='#6b7280' marginTop={4}>
            {course.duration}
          </Text>
          <View
            style={{
              flexDirection: "row",
              flexWrap: "wrap",
              gap: 8,
              marginTop: 12,
            }}
          >
            {course.highlights?.map((highlight) => (
              <Chip
                key={highlight}
                label={highlight}
                variant='blue'
                size='small'
              />
            ))}
          </View>
        </View>
      </View>
    ))}
  </YStack>
);

// 변형 토글 컴포넌트
const VariantToggle = ({
  currentVariant,
  onToggle,
}: {
  currentVariant: "list" | "timeline";
  onToggle: () => void;
}) => (
  <Button
    backgroundColor='transparent'
    onPress={onToggle}
    pressStyle={{ scale: 0.98 }}
  >
    <Ionicons
      name={currentVariant === "list" ? "list" : "time"}
      size={24}
      color='#666666'
    />
  </Button>
);

// 리스트 뷰 컴포넌트
const CourseList = ({
  data,
  styles,
}: {
  data: ExtendedTravelCourse[];
  styles: ResponsiveStyles;
}) => (
  <YStack
    gap={styles.spacing.gap}
    paddingHorizontal={styles.spacing.screenPadding}
  >
    {data.map((course) => (
      <XStack
        key={course.id}
        backgroundColor='$background'
        borderRadius='$4'
        padding={styles.spacing.padding}
        gap={styles.spacing.gap}
        shadowColor='$shadowColor'
        shadowOffset={{ width: 0, height: 2 }}
        shadowOpacity={0.1}
        shadowRadius={8}
      >
        <Stack
          width={80}
          height={80}
          backgroundColor='$gray2'
          borderRadius='$2'
        />
        <YStack flex={1} gap='$2'>
          <Text fontWeight='bold' fontSize={styles.fontSize.body}>
            {course.title}
          </Text>
          <Text color='$gray10' fontSize={styles.fontSize.small}>
            {course.description}
          </Text>
        </YStack>
      </XStack>
    ))}
  </YStack>
);
