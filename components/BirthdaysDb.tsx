import {
  SQLiteProvider,
  useSQLiteContext,
  type SQLiteDatabase,
} from "expo-sqlite";
import * as SQLite from "expo-sqlite";
import { useEffect, useState, Suspense } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  useColorScheme,
  Alert,
} from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import React from "react";
import Button from "@/components/Button";
import NotificationSetter from "@/components/NotificationHandler";
import NewBirthdayForm from "@/components/NewBirthdayForm";
import { daysUntilNextBirthday } from "@/components/dbComponents/DaysUntilBirthday";

/*
possible labels:
"birthdayDb"      shows all the birthdays in the db
"birthdayForm"    shows the form to introduce new birthdays
anything else     shows the list of incoming birthdays (15 days from the current date)
*/

type Props = {
  label: string;
};

export default function BirthdaysDb({ label }: Props) {
  return (
    <Suspense fallback={<Fallback />}>
      <SQLiteProvider
        databaseName="Birthdays.db"
        onInit={migrateDbIfNeeded}
        useSuspense
      >
        {label == "birthdayDb" ? (
          <View style={styles.Container}>
            <Header />
            <NotificationSetter
              seconds={5}
              title="Notificacion de prueba"
              body="Esta es una notificacion de prueba"
            />
            <Content />
          </View>
        ) : label == "birthdayForm" ? (
          <NewBirthdayForm />
        ) : (
          <UpcomingBirthdays />
        )}
      </SQLiteProvider>
    </Suspense>
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
  const themeButtonContainer =
    colorScheme === "light"
      ? styles.lightButtonContainer
      : styles.darkButtonContainer;

  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  useFocusEffect(
    React.useCallback(() => {
      // Do something when the screen is focused
      let isActive = true;
      async function setup() {
        const result = await db.getAllAsync<Todo>(
          "SELECT * FROM birthdays ORDER BY id DESC",
        );
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
    <View style={{ flex: 1 }}>
      <View style={themeButtonContainer}>
        <Text style={themeTodoItemText}>Order by:</Text>
        <View style={{ flexDirection: "row" }}>
          <Button
            label="Name"
            theme="orderBirthday"
            onPress={async () => orderByName(setTodos)}
          />
          <Button
            label="Year"
            theme="orderBirthday"
            onPress={() => orderByYear(setTodos)}
          />
          <Button
            label="Month"
            theme="orderBirthday"
            onPress={() => orderByMonth(setTodos)}
          />
        </View>
      </View>
      <ScrollView>
        <View style={themeContentContainer}>
          {todos.map((todo, index) => (
            <View style={themeTodoItemContainer} key={index}>
              <Text style={themeTodoItemName}>{`${todo.name}`}</Text>
              <Text style={themeTodoItemText}>
                {`Date: ${todo.year} - ${todo.month} - ${todo.day}`}
              </Text>
              <Text style={themeTodoItemText}>
                {`${daysUntilNextBirthday(todo.month, todo.day)} days left`}
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
                        onPress: async () =>
                          deleteBirthday(deleteName, todos, setTodos),
                      },
                    ],
                  );
                }}
              />
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

export function UpcomingBirthdays() {
  const colorScheme = useColorScheme();
  const themeUpcomingText =
    colorScheme === "light"
      ? styles.lightUpcomingText
      : styles.darkUpcomingText;
  const themeUpcomingContainer =
    colorScheme === "light"
      ? styles.lightUpcomingContainer
      : styles.darkUpcomingContainer;

  const db = useSQLiteContext();
  const [todos, setTodos] = useState<Todo[]>([]);

  // Get current date (day and month)
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();
  const currentDay = currentDate.getDate();
  const today = new Date(currentYear, currentMonth, currentDay);
  //Get upcoming date in 15 days (day and month)
  const upcomingDate = upcomingDateLimit(today, 15);
  const upcomingMonth = upcomingDate.getMonth();
  const upcomingDay = upcomingDate.getDate();

  async function setup() {
    const result = await db.getAllAsync<Todo>(
      "SELECT * FROM birthdays ORDER BY id DESC",
    );
    setTodos(result);
  }
  setup();

  return (
    <View
      style={{
        flex: 1,
        width: "100%",
      }}
    >
      <View style={[themeUpcomingContainer, { flexDirection: "row" }]}>
        <View style={{ flex: 1 }}>
          <Text style={themeUpcomingText}>NAME</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={themeUpcomingText}>DAY</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={themeUpcomingText}>MONTH</Text>
        </View>
      </View>
      <ScrollView>
        <View style={themeUpcomingContainer}>
          {todos.map((todo, index) => (
            <View key={index} style={{ flexDirection: "row", width: "100%" }}>
              <View style={{ flex: 1 }}>
                <Text style={themeUpcomingText}>{`${todo.name}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeUpcomingText}>{`${todo.day}`}</Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text style={themeUpcomingText}>{`${todo.month}`}</Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

// CRUD operations
const deleteBirthday = async (name, todos, setTodos) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
  // Delete birthday from te db
  await db.runAsync("DELETE FROM birthdays WHERE name = ?", name);
  // Delete birthday from the array (to refresh the list shown)
  let newTodos = [];
  let lenght = todos.length;
  for (let i = 0; i < lenght; i++) {
    if (todos[i].name !== name) {
      newTodos.push(todos[i]);
    }
  }
  alert(`${name} has been deleted`);
  setTodos(newTodos);
};

// Order functions
const orderByName = async (setTodos) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
  async function setup() {
    const result = await db.getAllAsync<Todo>(
      "SELECT * FROM birthdays ORDER BY name",
    );
    setTodos(result);
  }
  setup();
};
const orderByYear = async (setTodos) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
  async function setup() {
    const result = await db.getAllAsync<Todo>(
      "SELECT * FROM birthdays ORDER BY year, month, day, name",
    );
    setTodos(result);
  }
  setup();
};
const orderByMonth = async (setTodos) => {
  const db = await SQLite.openDatabaseAsync("Birthdays.db");
  async function setup() {
    const result = await db.getAllAsync<Todo>(
      "SELECT * FROM birthdays ORDER BY month, day, name",
    );
    setTodos(result);
  }
  setup();
};

// IMPORTANTE las funciones incomingDateLimit y addDays deben ir juntas en el mismo file!!!!!1
// Returns the date after n days days
const upcomingDateLimit = (today: Date, days: number) => {
  // Add 15 days to today
  const limitDate = addDays(today, days);
  return limitDate;
};

// Source - https://stackoverflow.com/a
// Posted by sparebytes, modified by community. See post 'Timeline' for change history
// Retrieved 2025-11-15, License - CC BY-SA 4.0
function addDays(date, days) {
  var result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

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
  separator: {
    height: "0.5%",
    width: "95%",
    backgroundColor: "#25292e",
    borderTopRightRadius: 2,
    borderTopLeftRadius: 2,
    alignItems: "center",
  },
  Container: {
    flex: 1,
    width: "100%",
    alignItems: "center",
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
    width: "100%",
    alignSelf: "center",
  },
  darkContentContainer: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: "#25292e",
    width: "100%",
    alignSelf: "center",
  },
  lightTodoItemContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "#DB877B",
    backgroundColor: "#fcf8f1",
    width: "auto",
  },
  darkTodoItemContainer: {
    borderWidth: 1,
    borderRadius: 15,
    borderColor: "skyblue",
    backgroundColor: "#03070e",
    width: "auto",
  },
  lightTodoItemName: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 15,
  },
  darkTodoItemName: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 20,
    fontWeight: "bold",
    paddingLeft: 15,
    paddingRight: 15,
  },
  lightTodoItemText: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
  darkTodoItemText: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 16,
    paddingLeft: 15,
    paddingRight: 15,
  },
  lightButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: "#fcf8f1",
    width: "100%",
    alignSelf: "center",
  },
  darkButtonContainer: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    gap: 5,
    backgroundColor: "#03070e",
    width: "100%",
    alignSelf: "center",
  },
  lightUpcomingContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#DB877B",
    backgroundColor: "#fcf8f1",
    width: "100%",
  },
  darkUpcomingContainer: {
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "skyblue",
    backgroundColor: "#03070e",
    width: "100%",
  },
  lightUpcomingText: {
    color: "#000",
    paddingVertical: 3,
    fontSize: 16,
    textAlign: "center",
  },
  darkUpcomingText: {
    color: "#fff",
    paddingVertical: 3,
    fontSize: 16,
    textAlign: "center",
  },
});
