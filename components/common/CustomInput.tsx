// components/common/CustomInput.tsx
import React, { ReactNode } from 'react';
import { InputProps, YStack, XStack, Label, Input, Text, AnimatePresence } from 'tamagui';

// CustomInput의 Props 타입을 정의합니다.
// Tamagui의 InputProps를 확장하되, 우리가 필요한 속성들을 추가합니다.
interface CustomInputProps extends Omit<InputProps, 'id'> {
  label: string;
  icon: ReactNode;
  field: string;
  error?: string;  // 에러 메시지를 받을 수 있도록 추가
  isFocused?: boolean;  // 포커스 상태를 외부에서 제어할 수 있도록 추가
}

// CustomInput 컴포넌트는 폼 입력 필드의 일관된 스타일과 동작을 제공합니다.
// 레이블, 아이콘, 입력 필드, 에러 메시지를 포함한 완전한 입력 필드 UI를 구성합니다.
export function CustomInput({
                              label,
                              icon,
                              field,
                              error,
                              isFocused = false,
                              ...props
                            }: CustomInputProps) {
  // 아이콘의 색상을 결정하는 함수
  const getIconColor = () => {
    if(error) return "$red10";
    if(isFocused) return "$blue11";
    return "$gray11";
  };

  // 테두리 색상을 결정하는 함수
  const getBorderColor = () => {
    if(error) return "$red10";
    if(isFocused) return "$blue11";
    return "$gray5";
  };

  return (
      <YStack gap="$2">
        {/* 레이블 */ }
        <Label
            htmlFor={ field }
            color={ isFocused ? "$blue11" : "$gray11" }

        >
          { label }
        </Label>

        {/* 입력 필드 컨테이너 */ }
        <XStack
            borderWidth={ 2 }
            borderColor={ getBorderColor() }
            borderRadius="$4"
            padding="$3"

        >
          {/* 아이콘 */ }
          { React.cloneElement(icon as React.ReactElement, {
            color: getIconColor()
          }) }

          {/* 입력 필드 */ }
          <Input
              id={ field }
              flex={ 1 }
              marginLeft="$2"
              borderWidth={ 0 }
              backgroundColor="transparent"
              { ...props }
          />
        </XStack>

        {/* 에러 메시지 */ }
        <AnimatePresence>
          { error && (
              <Text
                  color="$red10"
                  fontSize="$2"
                  enterStyle={ { opacity: 0, scale: 0.9 } }
                  exitStyle={ { opacity: 0, scale: 0.9 } }
              >
                { error }
              </Text>
          ) }
        </AnimatePresence>
      </YStack>
  );
}
