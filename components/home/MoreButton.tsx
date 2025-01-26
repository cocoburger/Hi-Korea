import { Button, XStack, Text } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { ResponsiveStyles } from "@/types/home";

interface MoreButtonProps {
  onPress: () => void;
  styles: ResponsiveStyles;
}

export function MoreButton({ onPress, styles }: MoreButtonProps) {
  return (
    <Button
      backgroundColor='transparent'
      paddingHorizontal='$3'
      pressStyle={{ opacity: 0.8 }}
      onPress={onPress}
    >
      <XStack alignItems='center' gap='$1'>
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
}
