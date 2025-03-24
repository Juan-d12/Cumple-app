import { Tabs } from "expo-router";
import { Gear, Gift, HomeIcon } from "../../components/Icons";

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerStyle: {
          backgroundColor: "#25292e",
        },
        headerShadowVisible: false,
        headerTintColor: "#fff",
        tabBarStyle: {
          backgroundColor: "#25292e",
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#DB877B",
          tabBarInactiveTintColor: "#c0c1c2",
          tabBarIcon: ({ color }) => <HomeIcon color={color} />,
        }}
      />
      <Tabs.Screen
        name="birthdays"
        options={{
          title: "Birthdays",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#DB877B",
          tabBarInactiveTintColor: "#c0c1c2",
          tabBarIcon: ({ color }) => <Gift color={color} />,
        }}
      />
      <Tabs.Screen
        name="configuration"
        options={{
          title: "Settings",
          headerTitleAlign: "center",
          tabBarActiveTintColor: "#DB877B",
          tabBarInactiveTintColor: "#c0c1c2",
          tabBarIcon: ({ color }) => <Gear color={color} />,
        }}
      />
    </Tabs>
  );
}
