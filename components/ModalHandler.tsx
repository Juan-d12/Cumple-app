import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import BirthdaysDb from "@/components/BirthdaysDb";
import { WindowClose } from "@/components/Icons";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function ModalHandler({ isVisible, onClose }: Props) {
  // Color scheme
  const colorScheme = useColorScheme();

  const themeModalContent =
    colorScheme === "light"
      ? styles.lightModalContent
      : styles.darkModalContent;

  const themeTitleContainer =
    colorScheme === "light"
      ? styles.lightTitleContainer
      : styles.darkTitleContainer;

  const themeTitle =
    colorScheme === "light" ? styles.lightTitle : styles.darkTitle;

  const themePad = colorScheme === "light" ? styles.lightPad : styles.darkPad;

  const iconColor = colorScheme === "light" ? "red" : "#DB877B";

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={themeModalContent}>
        <View style={themeTitleContainer}>
          <Text style={themeTitle}>Fill the birthday form</Text>
          <Pressable onPress={onClose}>
            <WindowClose color={iconColor} size={24} />
          </Pressable>
        </View>
        <View style={themePad}>
          <BirthdaysDb label="birthdayForm" />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  lightModalContent: {
    height: "90%",
    width: "100%",
    backgroundColor: "#fcf8f1",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  darkModalContent: {
    height: "90%",
    width: "100%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    position: "absolute",
    bottom: 0,
  },
  lightTitleContainer: {
    height: "6%",
    backgroundColor: "#e0e1e2",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkTitleContainer: {
    height: "6%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  lightTitle: {
    color: "#000",
    fontSize: 16,
  },
  darkTitle: {
    color: "#fff",
    fontSize: 16,
  },
  lightPad: {
    flex: 1,
    backgroundColor: "#e0e1e2",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
  darkPad: {
    flex: 1,
    backgroundColor: "#25292e",
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10,
  },
});
