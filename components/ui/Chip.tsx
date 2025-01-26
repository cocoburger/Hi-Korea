import { Button, Text, styled } from "tamagui";

// 1. Variant 타입 재정의 (색상 기반)
export type ChipVariant = 'red' | 'green' | 'blue' | 'purple' | 'pink' | 'orange';
export type ChipSize = "small" | "medium" | "large" | "xlarge";

const VARIANTS = {
  red: {
    bg: "#FFE4E4",
    hoverBg: "#FFD1D1",
    text: "#FF4747",
    borderColor: "#FFE4E4",
  },
  green: {
    bg: "#E4FFE4",
    hoverBg: "#D1FFD1",
    text: "#47FF47",
    borderColor: "#E4FFE4",
  },
  blue: {
    bg: "#E4E4FF",
    hoverBg: "#D1D1FF",
    text: "#4747FF",
    borderColor: "#E4E4FF",
  },
  purple: {
    bg: "#F4E4FF",
    hoverBg: "#EBD1FF",
    text: "#9747FF",
    borderColor: "#F4E4FF",
  },
  pink: {
    bg: "#FFE4F4",
    hoverBg: "#FFD1EB",
    text: "#FF47B1",
    borderColor: "#FFE4F4",
  },
  orange: {
    bg: "#FFE4D6",
    hoverBg: "#FFD1B8",
    text: "#FF7847",
    borderColor: "#FFE4D6",
  },
} as const;

const SIZE_STYLES = {
  small: {
    paddingHorizontal: "$3",
    paddingVertical: "$2",
    fontSize: 12,
    height: 28,
  },
  medium: {
    paddingHorizontal: "$4",
    paddingVertical: "$2.5",
    fontSize: 14,
    height: 36,
  },
  large: {
    paddingHorizontal: "$5",
    paddingVertical: "$3",
    fontSize: 16,
    height: 44,
  },
  xlarge: {
    paddingHorizontal: "$6",
    paddingVertical: "$4",
    fontSize: 18,
    height: 52,
  },
};

type ChipProps = {
  label: string;
  variant?: ChipVariant;
  size?: ChipSize;
  isSelected?: boolean;
  onPress?: () => void;
}

export const Chip = ({
                       label,
                       variant = "blue",
                       size = "medium",
                       isSelected = false,
                       onPress,
                     }: ChipProps) => {
  const variantStyle = VARIANTS[variant];
  const sizeStyle = SIZE_STYLES[size];

  return (
      <Button
          backgroundColor={ isSelected ? variantStyle.hoverBg : variantStyle.bg }
          paddingHorizontal={ sizeStyle.paddingHorizontal }
          paddingVertical={ sizeStyle.paddingVertical }
          height={ sizeStyle.height }
          borderRadius="$4"
          borderWidth={ 1 }
          borderColor={ isSelected ? variantStyle.text : variantStyle.borderColor }
          // borderColor={ variantStyle.borderColor }
          pressStyle={ {
            backgroundColor: variantStyle.hoverBg,
            scale: 0.98,
          } }
          onPress={ onPress }
          alignItems="center"
          justifyContent="center"
      >
        <Text
            color={ variantStyle.text }
            fontSize={ sizeStyle.fontSize }
            fontWeight={ isSelected ? "bold" : "normal" }
            textAlign="center"
        >
          { label }
        </Text>
      </Button>
  );
};
