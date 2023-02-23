import Realm from "realm";
import { realmConfig } from "../db/schema";

export const saveExistingOrder = async ({
  id,
  cart,
  cartSum,
  clientName,
  discount,
}) => {
  try {
    const db = await Realm.open(realmConfig);
    const orders = db.objects("Orders");
    const currentOrder = orders.filtered("_id= $0", id)[0];

    db.write(() => {
      currentOrder.clientName = clientName;
      currentOrder.items = cart;
      currentOrder.sum = cartSum;
      currentOrder.discount = discount;
      currentOrder.status = "Збережено";
      currentOrder.createAt = new Date();
    });
  } catch (error) {
    console.log(error);
  }
};
