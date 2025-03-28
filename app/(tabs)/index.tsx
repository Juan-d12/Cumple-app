import { View, StyleSheet, useColorScheme } from "react-native";
import { useState } from "react";
import { useFocusEffect } from "expo-router";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import NewBirthdayForm from "@/components/NewBirthdayForm";

const tortaImage = require("./../../assets/images/torta.jpg");

export default function Index() {
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

  const themeFooterContainer =
    colorScheme === "light"
      ? styles.lightFooterContainer
      : styles.darkFooterContainer;

  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onAddBirthday = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={themeContainer}>
      <View style={styles.imageContainer}>
        <ImageViewer imgSource={tortaImage} />
      </View>
      <View style={themeFooterContainer}>
        <Button
          label="Add Birthday"
          theme="addBirthday"
          onPress={onAddBirthday}
        />
      </View>
      <NewBirthdayForm isVisible={isModalVisible} onClose={onModalClose} />
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
