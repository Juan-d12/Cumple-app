import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "expo-router";

export default function Birthdays() {
  const { selectedColorScheme } = require("./configuration"); // Inintial Forbidden import
  const [colorScheme, setColorScheme] = useState(useColorScheme());
  const systemTheme = useColorScheme();

  useFocusEffect(() => {
    const loadTheme = async () => {
      const { selectedColorScheme } = require("./configuration"); // Update Forbidden import
      if (selectedColorScheme === "light" || selectedColorScheme === "dark") {
        setColorScheme(selectedColorScheme);
      } else {
        setColorScheme(systemTheme);
      }
    };
    loadTheme();
  });

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  return (
    <View style={themeContainer}>
      <Text style={themeText}>
        This page will display all the saved birthdays (TODO)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  lightText: {
    color: "#000",
    paddingVertical: 3,
  },
  darkText: {
    color: "#fff",
    paddingVertical: 3,
  },
});
