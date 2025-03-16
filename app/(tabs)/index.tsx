import { Text, View, StyleSheet } from "react-native";
import { Image } from "expo-image";

export default function Index() {
  return (
    <View style={styles.container}>
      <Image
        source={require("./../../assets/images/torta.jpg")}
        style={{ width: 200, height: 300 }}
      />
      <Text style={styles.text}>Recordatorio de cumpleaños</Text>
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
