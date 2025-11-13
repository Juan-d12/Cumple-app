import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BirthdaysDb from "@/components/BirthdaysDb";

export default function Birthdays() {
  const colorScheme = useColorScheme();

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  return (
    <View style={themeContainer}>
      <SafeAreaView>
        <Text style={themeText}>The Birthdays have this format:</Text>
        <Text style={themeText}>Date: Year - Month - Day</Text>
        <BirthdaysDb label={"birthdayDb"} />
      </SafeAreaView>
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
    textAlign: "center",
  },
  darkText: {
    color: "#fff",
    paddingVertical: 3,
    textAlign: "center",
  },
});
