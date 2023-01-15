import axios from "axios";
//DB
import Realm from "realm";
import { realmConfig } from "../db/schema";

export const sendOrderByMail = async (_id) => {
  try {
    const managerName = await AsyncStorage.getItem("managerName");
    const db = await Realm.open(realmConfig);
    const order = db.objectForPrimaryKey("Orders", _id);
    const { items, clientName } = order;
    const response = axios.post("http://192.168.34.2:3000/sendOrder", {
      items,
      clientName,
      managerName,
    });
    let result = response.data;
    console.log(result);
  } catch (e) {
    console.log(e);
  }
};
