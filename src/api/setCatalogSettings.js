import AsyncStorage from "@react-native-async-storage/async-storage";

export const setCatalogSettings = async (isAutoQtyModal) => {
  try {
    await AsyncStorage.setItem(
      "isAutoQtyModal",
      JSON.stringify(isAutoQtyModal)
    );
  } catch (error) {
    console.log(error);
  }
};
