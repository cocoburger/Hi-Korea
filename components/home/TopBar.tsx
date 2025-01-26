import { XStack, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { ResponsiveStyles } from "@/types/home";

interface TopBarProps {
  styles: ResponsiveStyles;
}

export function TopBar({ styles }: TopBarProps) {
  return (
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
      <XStack gap={styles.spacing.gap}>
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
  );
}
