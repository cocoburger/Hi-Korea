import { YStack, Text } from "tamagui";
import { ResponsiveStyles } from "@/types/home";

interface SectionProps {
  title: string;
  children: React.ReactNode;
  styles: ResponsiveStyles;
  rightElement?: React.ReactNode;
}

export function Section({
  title,
  children,
  styles,
  rightElement,
}: SectionProps) {
  return (
    <YStack>
      <YStack
        flexDirection='row'
        justifyContent='space-between'
        alignItems='center'
        marginBottom={styles.spacing.gap}
      >
        <Text fontSize={styles.fontSize.title} fontWeight='bold'>
          {title}
        </Text>
        {rightElement}
      </YStack>
      {children}
    </YStack>
  );
}
