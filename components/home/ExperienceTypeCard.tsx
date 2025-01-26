import { TouchableOpacity } from "react-native";
import { Stack, styled, Text, XStack, YStack } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { ResponsiveStyles, IconName } from "@/types/home";

const CardContainer = styled(Stack, {
  name: "ExperienceCard",
  backgroundColor: "$white",
  borderRadius: 12,
  padding: 16,
  width: 160,
  pressStyle: {
    opacity: 0.8,
  },
  shadowColor: "$shadow",
  shadowRadius: 4,
  shadowOffset: { width: 0, height: 2 },
  variants: {
    elevation: {
      sm: { shadowOpacity: 0.1 },
      md: { shadowOpacity: 0.2 },
    },
  } as const,
});

interface ExperienceTypeCardProps {
  icon: IconName;
  title: string;
  description: string;
  styles: ResponsiveStyles;
  onPress?: () => void;
}

export const ExperienceTypeCard = ({
  icon,
  title,
  description,
  styles,
  onPress,
}: ExperienceTypeCardProps) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <CardContainer elevation='sm'>
        <YStack gap={styles.spacing.gap}>
          <XStack alignItems='center' gap={8}>
            <Ionicons name={icon} size={24} color='#3b82f6' />
            <Text fontSize={16} fontWeight='600'>
              {title}
            </Text>
          </XStack>
          <Text fontSize={14} color='$gray10' numberOfLines={2} lineHeight={18}>
            {description}
          </Text>
        </YStack>
      </CardContainer>
    </TouchableOpacity>
  );
};
