import React, { useState } from "react";
import { Text, View, Platform } from "react-native";
import Button from "./Button";
import DateTimePicker from "@react-native-community/datetimepicker";

export const SelectDate = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
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
        <Text>Date Selected:</Text>
        <Text>{date.toDateString()}</Text>
      </View>
      <View>
        <Button
          label="Select a date"
          theme="showDatePicker"
          onPress={showDatepicker}
        />
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
