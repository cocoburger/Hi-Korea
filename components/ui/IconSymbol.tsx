// IconSymbol.tsx
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { SymbolWeight } from 'expo-symbols';
import React from 'react';
import { OpaqueColorValue, StyleProp, TextStyle } from 'react-native';

// SFSymbols와 MaterialIcons 간의 매핑을 정의합니다.
// 각 키는 SFSymbol 이름이고, 값은 MaterialIcons의 이름입니다.
const MAPPING = {
  // 홈 관련 아이콘
  'house.fill': 'home',

  // 음식 관련 아이콘
  'fork.knife': 'restaurant',

  // 검색 관련 아이콘
  'magnifyingglass': 'search',
  'magnifyingglass.circle': 'search',

  // 카메라 관련 아이콘
  'camera': 'camera-alt',
  'camera.fill': 'camera',

  // 프로필 관련 아이콘
  'person': 'person-outline',
  'person.fill': 'person',

  
  // 별표 아이콘 추가
  'star': 'star-border',  // 빈 별표 아이콘
  'star.fill': 'star'     // 채워진 별표 아이콘
} as const;

export type IconSymbolName = keyof typeof MAPPING;


export function IconSymbol({
                             name,
                             size = 24,
                             color,
                             style,
                           }: {
  name: IconSymbolName;
  size?: number;
  color: string | OpaqueColorValue;
  style?: StyleProp<TextStyle>;
  weight?: SymbolWeight;
}) {
  return <MaterialIcons
      color={ color }
      size={ size }
      name={ MAPPING[name] }
      style={ style }
  />;
}
