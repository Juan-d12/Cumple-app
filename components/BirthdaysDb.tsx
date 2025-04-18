import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import { useEffect, useState, Suspense } from "react";
import { View, Text, StyleSheet, useColorScheme } from "react-native";
import Button from "@/components/Button";

type Props = {
  showAddButton: boolean;
  insertName?: string;
  insertDay?: number;
  insertMonth?: number;
  insertYear?: number;
};

export default function BirthdaysDb({
  showAddButton,
  insertName,
  insertDay,
  insertMonth,
  insertYear,
}: Props) {
  const colorScheme = useColorScheme();

  const themeContainer =
    colorScheme === "light" ? styles.lightContainer : styles.darkContainer;

  return (
    <View style={themeContainer}>
      <Suspense fallback={<Fallback />}>
        <SQLiteProvider
          databaseName="Birthdays.db"
          onInit={createTableIfNeeded}
          useSuspense
        >
          <Header />
          {!showAddButton ? (
            <Content />
          ) : (
            <Button
              label="Add"
              theme="insertBirthday"
              onPress={() =>
                alert("check birthday is correct and add it to the DB (TO DO)")
              }
            />
          )}
        </SQLiteProvider>
      </Suspense>
    </View>
  );
}

export function Fallback() {
  return <Text>Loading DB...</Text>;
}

export function Header() {
  const colorScheme = useColorScheme();
  const themeHeaderContainer =
    colorScheme === "light"
      ? styles.lightHeaderContainer
      : styles.darkHeaderContainer;
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
    <View style={themeHeaderContainer}>
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
  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    async function setup() {
      const result = await db.getAllAsync<Todo>("SELECT * FROM birthdays");
      setTodos(result);
    }
    setup();
  }, []);

  return (
    <View style={themeContentContainer}>
      {todos.map((todo, index) => (
        <View style={themeTodoItemContainer} key={index}>
          <Text>{`${todo.name}: ${todo.day} - ${todo.month + 1} - ${todo.year}`}</Text>
        </View>
      ))}
    </View>
  );
}

async function createTableIfNeeded(db: SQLiteDatabase) {
  await db.execAsync(`
    PRAGMA journal_mode = 'wal';
    CREATE TABLE IF NOT EXISTS birthdays (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, name TEXT NOT NULL, day INT NOT NULL, month INT NOT NULL, year INT NOT NULL);
    `);
}

const styles = StyleSheet.create({
  lightContainer: {},
  darkContainer: {},
  lightHeaderContainer: {},
  darkHeaderContainer: {},
  lightHeaderText: {
    color: "#000",
    paddingVertical: 3,
  },
  darkHeaderText: {
    color: "#fff",
    paddingVertical: 3,
  },
  lightContentContainer: {},
  darkContentContainer: {},
  lightTodoItemContainer: {},
  darkTodoItemContainer: {},
});
