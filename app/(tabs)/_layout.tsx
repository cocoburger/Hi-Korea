import { Tabs } from "expo-router";
import { Platform } from "react-native";
import { XStack, Text, YStack } from "tamagui";
import { IconSymbol } from "@/components/ui/IconSymbol";
import { useColorScheme } from "@/hooks/useColorScheme";

const TAB_ITEMS = [
  {
    name: "index",
    title: "Home",
    icon: "house",
    activeIcon: "house.fill",
  },
  {
    name: "food",
    title: "food",
    icon: "fork.knife",
    activeIcon: "fork.knife",
  },
  {
    name: "map",
    title: "map",
    icon: "magnifyingglass",
    activeIcon: "magnifyingglass.circle",
  },
  {
    name: "favorite",
    title: "favorite",
    icon: "camera",
    activeIcon: "camera.fill",
  },
  {
    name: "my",
    title: "my",
    icon: "person",
    activeIcon: "person.fill",
  },
] as const;

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const isDark = colorScheme === "dark";

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: true,
        tabBarActiveTintColor: "#6366F1",
        tabBarInactiveTintColor: isDark ? "#666666" : "#999999",
        tabBarStyle: {
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: Platform.OS === "ios" ? 94 : 68,
          backgroundColor: isDark ? "#000000" : "#FFFFFF",
          borderTopWidth: 0,
          paddingHorizontal: 16,
          paddingTop: 12,
          paddingBottom: Platform.OS === "ios" ? 28 : 12,
        },
        tabBarButton: (props) => {
          const { children, accessibilityState, onPress } = props;
          const isSelected = accessibilityState?.selected;

          return (
            <YStack
              flex={1}
              alignItems='center'
              onPress={onPress}
              backgroundColor={isSelected && isDark ? "#1A1A1A" : "transparent"}
              borderRadius={20}
              paddingVertical={8}
            >
              <XStack
                alignItems='center'
                space='$2'
                opacity={isSelected ? 1 : 0.6}
                backgroundColor={
                  isSelected ? (isDark ? "#1A1A1A" : "#F3F4F6") : "transparent"
                }
                paddingHorizontal={12}
                paddingVertical={6}
                borderRadius={20}
              >
                {children}
              </XStack>
            </YStack>
          );
        },
        tabBarIconStyle: {
          marginBottom: 0,
        },
        tabBarLabelStyle: {
          fontFamily: "Pretendard-Medium",
          fontSize: 13,
          marginLeft: 4,
        },
      }}
    >
      {TAB_ITEMS.map((item) => (
        <Tabs.Screen
          key={item.name}
          name={item.name}
          options={{
            title: item.title,
            tabBarIcon: ({ focused, color }) => (
              <IconSymbol
                name={focused ? item.activeIcon : item.icon}
                size={20}
                color={color}
              />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
