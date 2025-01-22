import React from "react";
import { Input, XStack } from "tamagui";
import { IconSymbol } from "./IconSymbol";

interface SearchBarProps {
  placeholder: string;
}

export function SearchBar({ placeholder }: SearchBarProps) {
  return (
    <XStack
      backgroundColor='$gray3'
      borderRadius='$4'
      padding='$2'
      alignItems='center'
    >
      <IconSymbol name='magnifyingglass' size={20} color='$gray9' />
      <Input
        flex={1}
        placeholder={placeholder}
        borderWidth={0}
        backgroundColor='transparent'
        marginLeft='$2'
      />
    </XStack>
  );
}
