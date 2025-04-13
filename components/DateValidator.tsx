import React, { useState } from "react";
import { Text, View, Platform, StyleSheet, useColorScheme } from "react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";

type Props = {
  date: any;
  setDate: any;
  day: number;
  setDay: any;
  month: number;
  setMonth: any;
  year: number;
  setYear: any;
};

export const SelectDate = ({
  date,
  setDate,
  day,
  setDay,
  month,
  setMonth,
  year,
  setYear,
}: Props) => {
  // Color scheme
  const colorScheme = useColorScheme();

  const themeBody =
    colorScheme === "light" ? styles.lightBody : styles.darkBody;

  // Date Validator
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    setDay(Number(currentDate.getDate()));
    setMonth(Number(date.getMonth()));
    setYear(Number(date.getFullYear()));
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  return (
    <View>
      <View>
        <Button
          label="Select a date"
          theme="showDatePicker"
          onPress={showDatepicker}
        />
      </View>
      <View style={styles.bodyContainer}>
        <Text style={themeBody}>Date Selected: {date.toDateString()}</Text>
      </View>
      {show && (
        <DateTimePicker
          maximumDate={new Date()}
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  lightBody: {
    color: "#000",
    paddingVertical: 3,
  },
  darkBody: {
    color: "#fff",
    paddingVertical: 3,
  },
  bodyContainer: {
    alignItems: "center",
    paddingVertical: 3,
  },
});
