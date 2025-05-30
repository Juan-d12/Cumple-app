import {
  Modal,
  View,
  Text,
  Pressable,
  StyleSheet,
  useColorScheme,
  TextInput,
} from "react-native";
import { useState } from "react";
import { WindowClose } from "./Icons";
import { SelectDate } from "./DateValidator";
import Button from "@/components/Button";
import BirthdaysDb from "@/components/BirthdaysDb";

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export default function NewBirthdayForm({ isVisible, onClose }: Props) {
  // Color scheme
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

  const themePad = colorScheme === "light" ? styles.lightPad : styles.darkPad;

  const themeInput =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;

  // Name form
  const [name, onChangeName] = useState("");

  // Date Validator
  const [date, setDate] = useState(new Date());

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
          <View style={themeBodyContainer}>
            <Text style={themeBody}>Here comes the form (TODO)</Text>
            <Text style={themeBody}>Name:</Text>
            <TextInput
              style={themeInput}
              onChangeText={onChangeName}
              value={name}
              placeholder="Insert Name"
              placeholderTextColor={colorScheme === "light" ? "#000" : "#fff"}
            />
            <Text style={themeBody}>Date:</Text>
            <SelectDate date={date} setDate={setDate} />
            <BirthdaysDb
              showAddButton={true}
              insertName={name}
              insertDate={date}
            />
          </View>
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
  lightBodyContainer: {
    flex: 1,
    backgroundColor: "#fcf8f1",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
  },
  darkBodyContainer: {
    flex: 1,
    backgroundColor: "#03070E",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
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
  lightBody: {
    color: "#000",
    paddingVertical: 3,
  },
  darkBody: {
    color: "#fff",
    paddingVertical: 3,
  },
  lightInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
    borderColor: "#000",
  },
  darkInput: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#fff",
  },
});
