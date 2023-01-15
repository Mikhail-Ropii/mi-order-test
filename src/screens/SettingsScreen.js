import { useState } from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SettingsScreen = () => {
  const [name, setName] = useState();

  const handleSaveToStorage = async () => {
    try {
      await AsyncStorage.setItem("managerName", name);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View>
      <Text style={styles.nameText}>Ім'я представника</Text>
      <TextInput
        style={styles.input}
        placeholder={"Введіть ПІБ"}
        autoFocus={false}
        value={name}
        onChangeText={(value) => setName(value)}
      ></TextInput>
      <TouchableOpacity onPress={handleSaveToStorage} style={styles.btn}>
        <Text>Зберегти</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  input: {
    width: 300,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  nameText: {
    fontFamily: "roboto.medium",
    fontSize: 18,
  },
  btn: {
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    minWidth: 120,
    backgroundColor: "#49b1e6",
    borderRadius: 100,
  },
});
