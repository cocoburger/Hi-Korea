import { Button, ButtonText, Spinner, styled } from "tamagui";
import { Ionicons } from "@expo/vector-icons";
import React from "react";

export const CustomButton = styled(Button, {
  name: "SignUpButton",
  backgroundColor: "$blue8",
  borderRadius: "$4",
  pressStyle: {
    scale: 0.98,
    opacity: 0.9,
  },

  variants: {
    variant: {
      primary: {
        bg: "$blue8",
        color: "white",
      },
      secondary: {
        bg: "$gray3",
        color: "$gray12",
      },
    },
    size: {
      small: {
        padding: "$2",
        fontSize: "$3",
      },
      medium: {
        padding: "$3",
        fontSize: "$4",
      },
      large: {
        padding: "$4",
        fontSize: "$5",
      },
    },
    disabled: {
      true: {
        opacity: 0.6,
        pointerEvents: "none",
      },
    },
  } as const,

  defaultVariants: {
    variant: "primary",
    size: "medium",
  },
});

interface SignUpButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary";
  size?: "small" | "medium" | "large";
  iconName?: keyof typeof Ionicons.glyphMap;
  marginTop?: string;
}

export const SignUpButton = ({
                               children,
                               variant = "primary",
                               size = "medium",
                               iconName,
                               marginTop,
                             }: SignUpButtonProps) => {
  return (
      <CustomButton>
        { iconName && (
            <Ionicons
                name={ iconName }
                size={ 20 }
                color='$white'
                style={ { marginRight: 8 } }
            />
        ) }
        { children }
      </CustomButton>
  );
};
