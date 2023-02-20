import { useEffect, useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsScreen = () => {
  const [managerName, setManagerName] = useState("");
  const [passKey, setPassKey] = useState("");

  const handleSaveToStorage = async () => {
    const name = ["managerName", managerName];
    const pass = ["passKey", passKey];
    try {
      await AsyncStorage.multiSet([name, pass]);
      alert("Налаштування збережено");
    } catch (error) {
      alert("Помилка збереження");
      console.log(error);
    }
  };

  useEffect(() => {
    const getSettings = async () => {
      try {
        const values = await AsyncStorage.multiGet(["managerName", "passKey"]);
        setManagerName(values[0][1]);
        setPassKey(values[1][1]);
      } catch (error) {
        console.log(error);
      }
    };
    getSettings();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Налаштування</Text>
      </View>
      <View style={styles.contentWrap}>
        <Text style={styles.nameText}>Ім'я представника</Text>
        <View style={styles.nameSetWrap}>
          <TextInput
            style={styles.input}
            placeholder={"Введіть ПІБ"}
            autoFocus={false}
            value={managerName}
            onChangeText={(value) => setManagerName(value)}
          ></TextInput>
        </View>
        <Text style={styles.nameText}>Ключ доступу</Text>
        <View style={styles.nameSetWrap}>
          <TextInput
            style={styles.input}
            placeholder={"Введіть ключ доступу"}
            secureTextEntry={true}
            autoFocus={false}
            value={passKey}
            onChangeText={(value) => setPassKey(value)}
          ></TextInput>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={handleSaveToStorage}
            style={styles.btn}
          >
            <Text style={styles.btnText}>Зберегти</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    paddingHorizontal: 10,
    marginBottom: 8,
    backgroundColor: "#e7f4f6",
    borderBottomWidth: 1,
    borderColor: "#223344",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontFamily: "roboto.bold",
    fontSize: 20,
  },
  contentWrap: {
    paddingHorizontal: 5,
  },
  nameSetWrap: {
    maxWidth: 320,
  },
  input: {
    width: 300,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
    marginBottom: 5,
  },
  nameText: {
    fontFamily: "roboto.medium",
    fontSize: 18,
    marginBottom: 5,
  },
  btn: {
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignSelf: "center",
    backgroundColor: "#49b1e6",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "roboto.medium",
    fontSize: 16,
    color: "white",
  },
});
