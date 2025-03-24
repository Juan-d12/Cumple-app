import { Text, View, StyleSheet, useColorScheme } from "react-native";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";

const tortaImage = require("./../../assets/images/torta.jpg");

export default function Index() {
  const colorScheme = useColorScheme();

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  const themeFooterContainer =
    colorScheme === "light"
      ? styles.lightFooterContainer
      : styles.darkFooterContainer;

  return (
    <View style={themeContainer}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={tortaImage} />
      </View>
      <View style={themeFooterContainer}>
        <Button label="Add Birthday" theme="addBirthday" />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
  },
  darkContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  lightFooterContainer: {
    flex: 1 / 2,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
  },
  darkFooterContainer: {
    flex: 1 / 2,
    backgroundColor: "#25292e",
    alignItems: "center",
  },
  lightText: {
    color: "#000",
    paddingVertical: 3,
  },
  darkText: {
    color: "#fff",
    paddingVertical: 3,
  },
  imageContainer: {
    flex: 1,
    paddingTop: 40,
  },
});
