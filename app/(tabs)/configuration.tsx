import { Text, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import { InfoCircle } from "@/components/Icons";

export default function Configuration() {
  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.text}>
          This is the config page for the app (TODO)
        </Text>
      </View>
      <View style={styles.footerContainer}>
        <Text style={styles.text}>
          <InfoCircle color={"#fff"} />
        </Text>
        <Text style={styles.text}>Github:</Text>
        <Link style={styles.link} href="https://github.com/Juan-d12/Cumple-app">
          Cumple-app on github
        </Link>
      </View>
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
  footerContainer: {
    flex: 1 / 7,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "#fff",
    paddingVertical: 3,
  },
  link: {
    color: "skyblue",
    paddingVertical: 3,
    textDecorationLine: "underline",
  },
});
