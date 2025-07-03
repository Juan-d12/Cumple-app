import * as Notifications from "expo-notifications";
import { useState } from "react";
import { View } from "react-native";
import Button from "./Button";

// First, set the handler that will cause the notification
// to show the alert
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// This will show the notification
export default function NotificationTest() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  // Schedule Notification function
  const scheduleNotification = (seconds: number) => {
    Notifications.scheduleNotificationAsync({
      content: {
        title: "Notification test success",
        body: `This was scheduled for ${seconds} sec later`,
        data: { data: "goes here", test: { test1: "more data" } },
      },
      trigger: {
        type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
        seconds: seconds,
      },
    });
  };

  const handleShowNotification = () => {
    scheduleNotification(5);
  };

  return (
    <View>
      <Button
        label="Notification scheduler test"
        onPress={handleShowNotification}
      ></Button>
    </View>
  );
}
