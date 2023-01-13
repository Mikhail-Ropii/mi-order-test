export const CartSchema = {
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

export const OrderSchema = {
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

export const realmConfig = {
  path: "default.realm",
  schema: [OrderSchema, CartSchema],
};
