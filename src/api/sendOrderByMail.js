import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const sendOrderByMail = async (clientName) => {
  let order;
  try {
    const getdOrder = await AsyncStorage.getItem(clientName);
    order = getdOrder;
  } catch (e) {
    console.log(e);
  }
  try {
    console.log(order);
    const response = axios.post("http://192.168.34.2:3000/sendOrder", {
      order,
      clientName,
    });
    let result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
