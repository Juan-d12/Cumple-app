import * as Notifications from "expo-notifications";
import { useEffect, useState } from "react";
import { Platform, View } from "react-native";
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

type Props = {
  seconds: number;
  title: string;
  body: string;
};

// This will set the notification
export default function NotificationSetter({ seconds, title, body }: Props) {
  useEffect(() => {
    registerForNotificationsAsync();
  }, []);

  return (
    <View>
      <Button
        label="noti button"
        theme="orderBirthday"
        onPress={() => handleNotification(seconds, title, body)}
      />
    </View>
  );
}

// This will cancel all notifications
async function cancelNotifications() {
  Notifications.cancelAllScheduledNotificationsAsync();
}

// Schedule Notification function
async function scheduleNotification(
  seconds: number,
  title: string,
  body: string,
) {
  Notifications.scheduleNotificationAsync({
    content: {
      title: title,
      body: body,
      data: { data: "goes here", test: { test1: "more data" } },
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds: seconds,
    },
  });
}

const handleNotification = (seconds: number, title: string, body: string) => {
  scheduleNotification(seconds, title, body);
};

// Allow Notifications function
async function registerForNotificationsAsync() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("myNotificationChannel", {
      name: "A channel is needed for the permissions prompt to appear",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

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
