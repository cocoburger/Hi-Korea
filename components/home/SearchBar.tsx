import { XStack, YStack, Input } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import { ResponsiveStyles } from "@/types/home";

interface SearchBarProps {
  styles: ResponsiveStyles;
  placeholder: string;
}

export function SearchBar({ styles, placeholder }: SearchBarProps) {
  return (
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
        <Ionicons name='search' size={styles.iconSize.medium} color='#999999' />
        <Input
          flex={1}
          marginLeft='$2'
          placeholder={placeholder}
          borderWidth={0}
          backgroundColor='transparent'
          fontSize={styles.fontSize.body}
        />
      </XStack>
    </YStack>
  );
}
