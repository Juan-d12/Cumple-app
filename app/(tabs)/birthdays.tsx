import { Text, View, StyleSheet } from "react-native";

export default function Birthdays() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        This page will display all the saved birthdays (TODO)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
  },
});
