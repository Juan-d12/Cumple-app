import { Text, View, StyleSheet, useColorScheme } from "react-native";
import BirthdaysDb from "@/components/BirthdaysDb";

export default function Birthdays() {
  const colorScheme = useColorScheme();

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  return (
    <View style={themeContainer}>
      <Text style={themeText}>The Birthdays have this format:</Text>
      <Text style={themeText}>Name: Year - Month - Day</Text>
      <BirthdaysDb showAddButton={false} />
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#fcf8f1",
    alignItems: "center",
    justifyContent: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#03070E",
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
