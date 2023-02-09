import * as FileSystem from "expo-file-system";

export const setPriceToState = async () => {
  try {
    const uri = FileSystem.documentDirectory + "price.json";
    const price = JSON.parse(await FileSystem.readAsStringAsync(uri));
    return price;
  } catch (error) {}
};
