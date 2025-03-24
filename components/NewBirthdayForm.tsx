import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { WindowClose } from "./Icons";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Link } from "expo-router";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function NewBirthdayForm({ isVisible, onClose }: Props) {
  const colorScheme = useColorScheme();

  const iconColor = colorScheme === "light" ? "red" : "#DB877B";

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

  const themeBodyContainer =
    colorScheme === "light"
      ? styles.lightBodyContainer
      : styles.darkBodyContainer;

  const themeBody =
    colorScheme === "light" ? styles.lightBody : styles.darkBody;

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={themeModalContent}>
        <View style={themeTitleContainer}>
          <Text style={themeTitle}>Fill the birthday form</Text>
          <Pressable onPress={onClose}>
            <WindowClose color={iconColor} size={24} />
          </Pressable>
        </View>
        <View style={themeBodyContainer}>
          <Text style={themeBody}>Here comes the form (TODO)</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  lightModalContent: {
    height: "90%",
    width: "100%",
    backgroundColor: "#f5f5dc",
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
    height: "8%",
    backgroundColor: "#fff",
    borderTopRightRadius: 10,
    borderTopLeftRadius: 10,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  darkTitleContainer: {
    height: "8%",
    backgroundColor: "#464C55",
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
  lightBodyContainer: {
    flex: 1,
    backgroundColor: "#f5f5dc",
    alignItems: "center",
    justifyContent: "center",
  },
  darkBodyContainer: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  lightBody: {
    color: "#000",
    paddingVertical: 3,
  },
  darkBody: {
    color: "#fff",
    paddingVertical: 3,
  },
});
