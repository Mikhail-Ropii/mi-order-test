import { Realm, createRealmContext } from "@realm/react";

export class Orders extends Realm.Object {
  static schema = {
    name: "Orders",
    properties: {
      _id: "objectId",
      clientName: "string",
      items: { type: "list", objectType: "Cart" },
      sum: "float",
      discount: "int",
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
      price: "float",
      priceDiscount: "float",
      qty: "string",
      sum: "float",
      isDiscount: "string",
    },
  };
}

const migrationFunction = (oldRealm, newRealm) => {
  if (oldRealm.schemaVersion < 3) {
    const oldObjects = oldRealm.objects("Cart");
    const newObjects = newRealm.objects("Cart");

    for (let i = 0; i < oldObjects.length; i++) {
      newObjects[i].isDiscount = "";
    }
  }
};

const config = {
  // path: "default.realm",
  schema: [Orders, CartSchema],
  schemaVersion: 3,
  migration: migrationFunction,
};

export default createRealmContext(config);
