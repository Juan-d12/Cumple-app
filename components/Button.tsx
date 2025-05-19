import { StyleSheet, View, Pressable, Text } from "react-native";
import { BirthdayCake } from "./Icons";
import { Trash } from "./Icons";

type Props = {
  label: string;
  theme?: string; //addBirthday, insertBirthday
  onPress: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === "addBirthday") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "skyblue" }]}
          onPress={onPress}
        >
          <BirthdayCake color={"#000"} size={18} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "insertBirthday" || theme === "showDatePicker") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "skyblue" }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  if (theme === "deleteBirthday") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.delButton, { backgroundColor: "orange" }]}
          onPress={onPress}
        >
          <Trash color={"#000"} size={18} style={styles.buttonIcon} />
          <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={styles.button}
        onPress={() => alert("this is a test button")}
      >
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 70,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  delButton: {
    borderRadius: 10,
    width: "40%",
    height: "70%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  button: {
    borderRadius: 15,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
  buttonIcon: {
    paddingRight: 8,
  },
});
