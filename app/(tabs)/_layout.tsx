import { Tabs } from "expo-router";
import { useColorScheme } from "react-native";
import { Gear, Gift, HomeIcon } from "../../components/Icons";

export default function TabsLayout() {
  const colorScheme = useColorScheme();
  const themeBackground = colorScheme === "light" ? "#f5f5dc" : "#25292e";
  const themeHeaderTint = colorScheme === "light" ? "#000" : "#fff";
  const themeTabBarActive = colorScheme === "light" ? "#007389" : "#DB877B";
  const themeTabBarIncative = colorScheme === "light" ? "#b0b1b2" : "#c0c1c2";

  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: themeBackground,
        },
        headerShadowVisible: false,
        headerTintColor: themeHeaderTint,
        tabBarStyle: {
          backgroundColor: themeBackground,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          tabBarActiveTintColor: themeTabBarActive,
          tabBarInactiveTintColor: themeTabBarIncative,
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="birthdays"
        options={{
          title: "Birthdays",
          headerTitleAlign: "center",
          tabBarActiveTintColor: themeTabBarActive,
          tabBarInactiveTintColor: themeTabBarIncative,
          tabBarIcon: ({ color }) => <Gift color={color} />,
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          tabBarActiveTintColor: themeTabBarActive,
          tabBarInactiveTintColor: themeTabBarIncative,
          tabBarIcon: ({ color }) => <Gear color={color} />,
        }}
      />
    </Tabs>
  );
}
