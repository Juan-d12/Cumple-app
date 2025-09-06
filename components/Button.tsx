import { StyleSheet, View, Pressable, Text } from "react-native";
import { BirthdayCake, Trash } from "./Icons";

type Props = {
  label: string;
  theme?: string; //addBirthday, insertBirthday
  onPress: () => void;
};

export default function Button({ label, theme, onPress }: Props) {
  if (theme === "newBirthday") {
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
  if (theme === "insertBirthday") {
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
  if (theme === "showDatePicker") {
    return (
      <View style={styles.buttonContainer}>
        <Pressable
          style={[styles.dateButton, { backgroundColor: "skyblue" }]}
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
  if (theme === "orderBirthday") {
    return (
      <View style={styles.filterButtonContainer}>
        <Pressable
          style={[styles.button, { backgroundColor: "skyblue" }]}
          onPress={onPress}
        >
          <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
        </Pressable>
      </View>
    );
  }
  return (
    <View style={styles.buttonContainer}>
      <Pressable
        style={[styles.dateButton, { backgroundColor: "skyblue" }]}
        onPress={onPress}
      >
        <Text style={[styles.buttonLabel, { color: "#000" }]}>{label}</Text>
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
  filterButtonContainer: {
    width: 100,
    height: 50,
    marginHorizontal: 5,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  dateButton: {
    borderRadius: 15,
    width: "60%",
    height: "80%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
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
