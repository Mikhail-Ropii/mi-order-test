import * as FileSystem from "expo-file-system";

export const setPriceToState = async () => {
  try {
    const uri = FileSystem.documentDirectory + "price.json";
    const data = await FileSystem.readAsStringAsync(uri);
    const price = await JSON.parse(data);
    return price;
  } catch (error) {
    throw error;
  }
};
