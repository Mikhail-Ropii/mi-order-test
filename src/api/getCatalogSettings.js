import AsyncStorage from "@react-native-async-storage/async-storage";

export const getCatalogSettings = async () => {
  try {
    const value = await AsyncStorage.getItem("isAutoQtyModal");
    return JSON.parse(value);
  } catch (error) {
    console.log(error);
  }
};
