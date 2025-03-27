import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { Picker } from "@react-native-picker/picker";
import { useState, useEffect } from "react";
import { InfoCircle } from "@/components/Icons";

export default function Configuration() {
  const [selectedTheme, setSelectedTheme] = useState();
  const [colorScheme, setColorScheme] = useState(useColorScheme());

  const systemTheme = useColorScheme();

  useEffect(() => {
    const loadTheme = async () => {
      if (selectedTheme === "light" || selectedTheme === "dark") {
        setColorScheme(selectedTheme);
      } else {
        setColorScheme(systemTheme);
      }
    };
    loadTheme();
  }, [selectedTheme, systemTheme]); // This effect runs only when 'selectedTheme or systhemTheme' changes

  module.exports = { selectedColorScheme: selectedTheme }; // Forbidden export

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  const themeFooterContainer =
    colorScheme === "light"
      ? styles.lightFooterContainer
      : styles.darkFooterContainer;

  const themeLink =
    colorScheme === "light" ? styles.lightLink : styles.darkLink;

  const iconColor = colorScheme === "light" ? "#000" : "#fff";

  return (
    <View style={themeContainer}>
      <View>
        <Text style={themeText}>
          This is the config page for the app (TODO)
        </Text>
      </View>
      <View>
        <Text style={themeText}>Theme</Text>
        <Picker
          selectedValue={selectedTheme}
          style={{ height: 70, width: 250 }}
          mode={"dialog"}
          onValueChange={(itemValue, itemIndex) => setSelectedTheme(itemValue)}
        >
          <Picker.Item label="System value" value="auto" />
          <Picker.Item label="Light" value="light" />
          <Picker.Item label="Dark" value="dark" />
        </Picker>
      </View>
      <View style={themeFooterContainer}>
        <Text style={themeText}>
          <InfoCircle color={iconColor} />
        </Text>
        <Text style={themeText}>Github:</Text>
        <Link style={themeLink} href="https://github.com/Juan-d12/Cumple-app">
          Cumple-app on github
        </Link>
      </View>
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
  lightFooterContainer: {
    backgroundColor: "#f5f5dc",
    alignItems: "center",
    justifyContent: "center",
  },
  darkFooterContainer: {
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 20,
  },
  lightText: {
    color: "#000",
    paddingVertical: 3,
  },
  darkText: {
    color: "#fff",
    paddingVertical: 3,
  },
  lightLink: {
    color: "blue",
    paddingVertical: 3,
    textDecorationLine: "underline",
  },
  darkLink: {
    color: "skyblue",
    paddingVertical: 3,
    textDecorationLine: "underline",
  },
});
