import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
//DB
import Realm from "realm";
import { realmConfig } from "../db/schema";

export const sendOrderByMail = async (id) => {
  try {
    const managerName = await AsyncStorage.getItem("managerName");
    const db = await Realm.open(realmConfig);
    const orders = db.objects("Orders");
    const currentOrder = orders.filtered("_id= $0", id)[0];
    const { items, clientName } = currentOrder;
    const orderItems = JSON.parse(JSON.stringify(items)).map((item) => {
      delete item.name;
      delete item.price;
      delete item.priceDiscount;
      delete item.sum;
      delete item.isDiscount;
      return item;
    });
    const response = await axios.post(
      "https://mi-order-server.onrender.com/sendorder",
      {
        items: orderItems,
        clientName,
        managerName,
      }
    );
    db.write(() => {
      currentOrder.status = "Відправлено";
    });
    let result = response.data;
    console.log(result);
  } catch (e) {
    alert("Замовлення не відправлене", e);
    console.log(e);
  }
};
