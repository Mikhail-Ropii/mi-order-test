import { Realm, createRealmContext } from "@realm/react";

export class Orders extends Realm.Object {
  static schema = {
    name: "Orders",
    properties: {
      _id: "objectId",
      clientName: "string",
      items: { type: "list", objectType: "Cart" },
      sum: "int",
      status: "string?",
      createAt: "date",
    },
    primaryKey: "_id",
  };
}

export class CartSchema extends Realm.Object {
  static schema = {
    name: "Cart",
    properties: {
      article: "int",
      name: "string",
      price: "int",
      priceDiscount: "int",
      qty: "string",
      sum: "int",
    },
  };
}

const config = {
  // path: "default.realm",
  schema: [Orders, CartSchema],
};

export default createRealmContext(config);
