import { View, StyleSheet, Text, useColorScheme } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import ImageViewer from "@/components/ImageViewer";
import Button from "@/components/Button";
import ModalHandler from "@/components/ModalHandler";
import BirthdaysDb from "@/components/BirthdaysDb";

const tortaImage = require("./../../assets/images/torta.jpg");

export default function Index() {
  // Color scheme
  const colorScheme = useColorScheme();

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  const themeText =
    colorScheme === "light" ? styles.lightText : styles.darkText;

  const themeHeaderContainer =
    colorScheme === "light"
      ? styles.lightHeaderContainer
      : styles.darkHeaderContainer;

  const themeFooterContainer =
    colorScheme === "light"
      ? styles.lightFooterContainer
      : styles.darkFooterContainer;

  // Modal
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const onAddBirthday = () => {
    setIsModalVisible(true);
  };

  const onModalClose = () => {
    setIsModalVisible(false);
  };

  return (
    <View style={themeContainer}>
      <SafeAreaView>
        <View style={themeHeaderContainer}>
          <Text style={themeText}>Upcoming Birthdays:</Text>
          <BirthdaysDb label="incomingBd" />
        </View>
        <View style={styles.imageContainer}>
          <ImageViewer imgSource={tortaImage} />
        </View>
        <View style={themeFooterContainer}>
          <Button
            label="New Birthday"
            theme="newBirthday"
            onPress={onAddBirthday}
          />
        </View>
        <ModalHandler isVisible={isModalVisible} onClose={onModalClose} />
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  lightContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#fcf8f1",
    alignItems: "center",
  },
  darkContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor: "#03070E",
    alignItems: "center",
  },
  lightHeaderContainer: {
    flex: 1 / 4,
    backgroundColor: "#fcf8f1",
    alignItems: "center",
  },
  darkHeaderContainer: {
    flex: 1 / 4,
    backgroundColor: "#03070E",
    alignItems: "center",
  },
  lightFooterContainer: {
    flex: 1 / 4,
    backgroundColor: "#fcf8f1",
    alignItems: "center",
    justifyContent: "center",
  },
  darkFooterContainer: {
    flex: 1 / 4,
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
  imageContainer: {
    flex: 2 / 4,
    alignItems: "center",
    justifyContent: "center",
  },
});
