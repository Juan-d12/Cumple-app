import {
  View,
  Text,
  StyleSheet,
  useColorScheme,
  TextInput,
  Alert,
} from "react-native";
import { useState } from "react";
import { SelectDate } from "@/components/DateValidator";
import { useSQLiteContext } from "expo-sqlite";
import Button from "@/components/Button";

export default function NewBirthdayForm() {
  // Db
  const db = useSQLiteContext();

  // CRUD operations
  const insertBirthday = async (name, day, month, year) => {
    // name must be unique
    const nameResult = await db.getFirstAsync(
      "SELECT name FROM birthdays WHERE name = ?",
      name,
    );
    if (nameResult && nameResult["name"] === name) {
      alert("This name is already saved, try a different name");
    } else {
      await db.runAsync(
        "INSERT INTO birthdays (name, day, month, year) VALUES (?, ?, ?, ?)",
        name,
        day,
        month,
        year,
      );
      alert(`${name} has been added`);
    }
  };

  // Color scheme
  const colorScheme = useColorScheme();

  const themeSeparator =
    colorScheme === "light" ? styles.lightSeparator : styles.darkSeparator;

  const themeBodyContainer =
    colorScheme === "light"
      ? styles.lightBodyContainer
      : styles.darkBodyContainer;

  const themeBody =
    colorScheme === "light" ? styles.lightBody : styles.darkBody;

  const themeInput =
    colorScheme === "light" ? styles.lightInput : styles.darkInput;

  // Name form
  const [name, onChangeName] = useState("");

  // Date Validator
  const [date, setDate] = useState(new Date());

  return (
    <View style={themeBodyContainer}>
      <Text style={themeBody}>Name:</Text>
      <TextInput
        style={themeInput}
        onChangeText={onChangeName}
        value={name}
        placeholder="Insert Name"
        placeholderTextColor={colorScheme === "light" ? "#000" : "#fff"}
      />
      <View style={themeSeparator}></View>
      <SelectDate date={date} setDate={setDate} />
      <View style={themeSeparator}></View>
      <Button
        label="Add"
        theme="insertBirthday"
        onPress={() => {
          const insertDay = date.getDate();
          const insertMonth = date.getMonth() + 1; // months are from 0 to 11
          const insertYear = date.getFullYear();
          // name can not be empty
          if (name === "") {
            alert("The name field cannot be empty");
          } else {
            Alert.alert(
              "Confirm Birthday",
              `Name: ${name} \nDate(year-month-day):${insertYear} - ${insertMonth} - ${insertDay}`,
              [
                {
                  text: "Cancel",
                  style: "cancel",
                },
                {
                  text: "OK",
                  onPress: async () =>
                    insertBirthday(name, insertDay, insertMonth, insertYear),
                },
              ],
            );
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  lightSeparator: {
    marginTop: 5,
    marginBottom: 5,
    height: "0.5%",
    width: "95%",
    backgroundColor: "#e0e1e2",
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: "center",
  },
  darkSeparator: {
    marginTop: 5,
    marginBottom: 5,
    height: "0.5%",
    width: "95%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignSelf: "center",
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
  lightBody: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 18,
  },
  darkBody: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 18,
  },
  lightInput: {
    height: "auto",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#000",
    borderColor: "#000",
    fontSize: 18,
  },
  darkInput: {
    height: "auto",
    margin: 12,
    borderWidth: 1,
    padding: 10,
    color: "#fff",
    borderColor: "#fff",
    fontSize: 18,
  },
});
