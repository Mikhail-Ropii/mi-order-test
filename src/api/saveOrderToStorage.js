//Redux
import AsyncStorage from "@react-native-async-storage/async-storage";

export const saveOrderToStorage = async ({ cart, clientName }) => {
  console.log(cart, clientName);
  if (!clientName) {
    return;
  }
  try {
    const jsonCart = JSON.stringify(cart);
    await AsyncStorage.setItem(`${clientName}`, jsonCart);
  } catch (e) {
    alert(e);
  }
};
