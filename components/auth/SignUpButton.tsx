import React from "react";
import { Button, styled } from "tamagui";
import { AntDesign, Ionicons } from "@expo/vector-icons";


const ButtonContainer = styled(Button, {
  name: "AuthButton",
  height: 44,
  borderRadius: 4,
  marginVertical: 6,
  pressStyle: {
    opacity: 0.8,
  },
});

type ButtonVariant =
    | "kakao"
    | "naver"
    | "google"
    | "apple"
    | "email"

interface AuthButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  variant: ButtonVariant;
  iconName?: keyof typeof Ionicons.glyphMap;
  size?: "small" | "medium" | "large";
  marginTop?: string;
}

const getButtonStyles = (variant: ButtonVariant) => {
  switch (variant) {
    case "kakao":
      return {
        backgroundColor: "#FEE500",
        color: "#000000",
      };
    case "naver":
      return {
        backgroundColor: "#03C75A",
        color: "#FFFFFF",
      };
    case "google":
      return {
        backgroundColor: "#4285F4",
        color: "#FFFFFF",
      };
    case "apple":
      return {
        backgroundColor: "#FFFFFF",
        color: "#000000",
      };
    case "email":
      return {
        backgroundColor: "#03C75A",
        color: "#374151",
      };
  }
};

export const AuthButton = ({
                             onPress,
                             variant,
                             ...props
                           }: AuthButtonProps) => {
  const styles = getButtonStyles(variant);


  return (
      <ButtonContainer { ...getButtonStyles(variant) } onPress={ onPress } { ...props }>
        { variant === 'google' && <AntDesign
            name="google"
            size={ 18 }
            color={ styles.color }
        /> }
        { props.children }
      </ButtonContainer>
  );
};
