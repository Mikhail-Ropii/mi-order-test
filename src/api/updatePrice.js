import * as FileSystem from "expo-file-system";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const updatePrice = async () => {
  let passKey;
  try {
    passKey = await AsyncStorage.getItem("passKey");
  } catch (error) {
    throw error;
  }
  const config = {
    headers: { Authorization: passKey },
  };
  try {
    const response = await axios.get(
      "http://46.36.221.117:3000/getprice",
      config
    );
    const data = JSON.stringify(response.data);

    const uri = FileSystem.documentDirectory + "price.json";
    await FileSystem.writeAsStringAsync(uri, data);
  } catch (error) {
    throw error;
  }
};
