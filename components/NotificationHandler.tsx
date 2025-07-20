import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
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

  useEffect(() => {
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View>
      <Button
        label="Notification scheduler test"
        onPress={handlePushNotification}
      ></Button>
    </View>
  );
}

// Schedule Notification function
async function schedulePushNotification(seconds: number) {
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
}

const handlePushNotification = () => {
  schedulePushNotification(5);
};

// Allow Notifications function
async function registerForPushNotificationsAsync() {
  const { status: existingStatus } = await Notifications.getPermissionsAsync();
  let finalStatus = existingStatus;
  if (existingStatus !== "granted") {
    const { status } = await Notifications.requestPermissionsAsync();
    finalStatus = status;
  }
  if (finalStatus !== "granted") {
    alert("Failed to get push token for push notification!");
    return;
  }
}
