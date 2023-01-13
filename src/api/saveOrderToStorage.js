import Realm from "realm";
import { realmConfig } from "../db/schema";

export const saveOrderToStorage = async ({ cart, cartSum, clientName }) => {
  try {
    const db = await Realm.open(realmConfig);
    db.write(() => {
      db.create("Orders", {
        _id: new Realm.BSON.ObjectId(),
        clientName: `${clientName}`,
        status: "Збережено",
        createAt: new Date(),
        sum: cartSum,
        items: cart,
      });
    });
  } catch (error) {
    console.log(error);
  }
};
