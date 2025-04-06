import React, { useState } from "react";
import { Text, View, Button, Platform } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const SelectDate = () => {
  const [date, setDate] = useState(new Date("2012-08-15"));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
    console.log(currentDate);
    console.log(date);
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
        <Button onPress={showDatepicker} title="Pick a date" />
      </View>
      {show && (
        <DateTimePicker
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
