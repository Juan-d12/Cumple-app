import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { useEffect, useState, Suspense } from "react";
import { View, Text, StyleSheet, useColorScheme, Alert } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import Button from "@/components/Button";

type Props = {
  showAddButton: boolean;
  insertName?: string;
  insertDate?: any;
};

export default function BirthdaysDb({
  showAddButton,
  insertName,
  insertDate,
}: Props) {
  return (
    <View style={styles.Container}>
      <Suspense fallback={<Fallback />}>
        <SQLiteProvider
          databaseName="Birthdays.db"
          onInit={migrateDbIfNeeded}
          useSuspense
        >
          <Header />
          {!showAddButton ? (
            <Content />
          ) : (
            <Button
              label="Add"
              theme="insertBirthday"
              onPress={() => {
                const insertDay = insertDate.getDate();
                const insertMonth = insertDate.getMonth() + 1; // months are from 0 to 11
                const insertYear = insertDate.getFullYear();
                Alert.alert(
                  "Confirm Birthday",
                  `Name: ${insertName} \nDate(year-month-day):${insertYear} - ${insertMonth} - ${insertDay}`,
                  [
                    {
                      text: "Cancel",
                      style: "cancel",
                    },
                    {
                      text: "OK",
                      onPress: async () =>
                        insertBirthday(
                          insertName,
                          insertDay,
                          insertMonth,
                          insertYear,
                        ),
                    },
                  ],
                );
              }}
            />
          )}
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

const onpressTest = async (name) => {
  alert(`This is a test with ${name}`);
};

export function Fallback() {
  return <Text>Loading DB...</Text>;
}

export function Header() {
  const colorScheme = useColorScheme();
  const themeHeaderText =
    colorScheme === "light" ? styles.lightHeaderText : styles.darkHeaderText;

  const db = useSQLiteContext();
  const [version, setVersion] = useState("");
  useEffect(() => {
    async function setup() {
      const result = await db.getFirstAsync<{ "sqlite_version()": string }>(
        "SELECT sqlite_version()",
      );
      setVersion(result["sqlite_version()"]);
    }
    setup();
  }, []);
  return (
    <View style={styles.HeaderContainer}>
      <Text style={themeHeaderText}>SQLite version: {version}</Text>
    </View>
  );
}

interface Todo {
  name: string;
  day: number;
  month: number;
  year: number;
}

export function Content() {
  const colorScheme = useColorScheme();
  const themeContentContainer =
    colorScheme === "light"
      ? styles.lightContentContainer
      : styles.darkContentContainer;
  const themeTodoItemContainer =
    colorScheme === "light"
      ? styles.lightTodoItemContainer
      : styles.darkTodoItemContainer;
  const themeTodoItemName =
    colorScheme === "light"
      ? styles.lightTodoItemName
      : styles.darkTodoItemName;
  const themeTodoItemText =
    colorScheme === "light"
      ? styles.lightTodoItemText
      : styles.darkTodoItemText;

  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      let isActive = true;
      async function setup() {
        const result = await db.getAllAsync<Todo>("SELECT * FROM birthdays");
        if (isActive) {
          setTodos(result);
        }
      }
      setup();
      return () => {
        // Do something when the screen is unfocused
        // Useful for cleanup functions
        isActive = false;
      };
    }, []),
  );

  return (
    <View style={themeContentContainer}>
      {todos.map((todo, index) => (
        <View style={themeTodoItemContainer} key={index}>
          <Text style={themeTodoItemName}>{`${todo.name}`}</Text>
          <Text style={themeTodoItemText}>
            {`Date: ${todo.year} - ${todo.month} - ${todo.day}`}
          </Text>
          <Button
            label="Delete"
            theme="deleteBirthday"
            onPress={() => {
              const deleteName = todo.name;
              Alert.alert(
                "Delete confirmation",
                `Are you sure you want to delete ${deleteName}?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Delete",
                    onPress: async () => deleteBirthday(deleteName),
                  },
                ],
              );
            }}
          />
        </View>
      ))}
    </View>
  );
}

const insertBirthday = async (name, day, month, year) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
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

const deleteBirthday = async (name) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
  // Delete birthday from te db
  await db.runAsync("DELETE FROM birthdays WHERE name = ?", name);
  alert(`${name} has been deleted`);
};

async function migrateDbIfNeeded(db: SQLiteDatabase) {
  const DATABASE_VERSION = 1;
  let { user_version: currentDbVersion } = await db.getFirstAsync<{
    user_version: number;
  }>("PRAGMA user_version");
  if (currentDbVersion >= DATABASE_VERSION) {
    return;
  }
  if (currentDbVersion === 0) {
    await db.execAsync(`
        PRAGMA journal_mode = 'wal';
        CREATE TABLE IF NOT EXISTS birthdays (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, day INT NOT NULL, month INT NOT NULL, year INT NOT NULL);
        `);
    currentDbVersion = 1;
  }
  // if (currentDbVersion === 1) {
  //   Add more migrations
  // }
  await db.execAsync(`PRAGMA user_version = ${DATABASE_VERSION}`);
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    width: "100%",
  },
  HeaderContainer: {
    alignItems: "center",
  },
  lightHeaderText: {
    color: "#000",
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  darkHeaderText: {
    color: "#fff",
    paddingVertical: 3,
    paddingHorizontal: 10,
  },
  lightContentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: "#e0e1e2",
  },
  darkContentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: "#25292e",
  },
  lightTodoItemContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#DB877B",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#fcf8f1",
  },
  darkTodoItemContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "skyblue",
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: "#03070e",
  },
  lightTodoItemName: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
  darkTodoItemName: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 20,
    fontWeight: "bold",
  },
  lightTodoItemText: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 16,
  },
  darkTodoItemText: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 16,
  },
});
