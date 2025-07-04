import { Text, View, StyleSheet, useColorScheme } from "react-native";
import { Link } from "expo-router";
import { InfoCircle } from "@/components/Icons";
import NotificationTest from "@/components/NotificationHandler";

export default function Configuration() {
  const colorScheme = useColorScheme();

  const themeSeparator =
    colorScheme === "light" ? styles.lightSeparator : styles.darkSeparator;

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeBodyContainer =
    colorScheme === "light"
      ? styles.lightBodyCotainer
      : styles.darkBodyCotainer;

  const themeFooterContainer =
    colorScheme === "light"
      ? styles.lightFooterContainer
      : styles.darkFooterContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  const themeLink =
    colorScheme === "light" ? styles.lightLink : styles.darkLink;

  const iconColor = colorScheme === "light" ? "#000" : "#fff";

  return (
    <View style={themeContainer}>
      <View style={themeBodyContainer}>
        <Text style={themeText}>
          This is the config page for the app (TODO)
        </Text>
      </View>
      <View style={themeSeparator}></View>
      <View style={themeBodyContainer}>
        <Text style={themeText}>Current Theme:</Text>
        <Text style={themeText}>{colorScheme}</Text>
      </View>
      <View style={themeSeparator}></View>
      <View style={themeBodyContainer}>
        <Text style={themeText}>Notification test</Text>
        <NotificationTest />
      </View>
      <View style={themeSeparator}></View>
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
  lightSeparator: {
    marginTop: 5,
    marginBottom: 5,
    height: "0.5%",
    width: "95%",
    backgroundColor: "#e0e1e2",
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: "center",
  },
  darkSeparator: {
    marginTop: 5,
    marginBottom: 5,
    height: "0.5%",
    width: "95%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: "center",
  },
  lightContainer: {
    flex: 1,
    backgroundColor: "#fcf8f1",
    paddingTop: 20,
    paddingBottom: 20,
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#03070E",
    paddingTop: 20,
    paddingBottom: 20,
  },
  darkBodyCotainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lightBodyCotainer: {
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lightFooterContainer: {
    alignItems: "center",
    justifyContent: "center",
  },
  darkFooterContainer: {
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
