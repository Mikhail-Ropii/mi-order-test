import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { sendOrderByMail } from "../api/sendOrderByMail";
//DB
import Realm from "realm";
import { realmConfig } from "../db/schema";
import { cartSlice } from "../redux/cart/cartReducer";

export const AllOrdersScreen = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]);

  // console.log(allOrders);

  useEffect(() => {
    const getAllOrders = async () => {
      const db = await Realm.open(realmConfig);
      const orders = db.objects("Orders");
      setAllOrders(orders);
    };
    getAllOrders();
  }, []);

  const handleSendBtn = async (item) => {
    try {
      await sendOrderByMail(item);
    } catch (e) {
      alert("Заказ не отправлен", e.message);
    }
  };

  const handleChangeBtn = (item) => {
    const foundOrder = allOrders.find((order) => {
      order._id == item._id;
      return item;
    });
    console.log(foundOrder);
    const { items, _id } = foundOrder;
    dispatch(cartSlice.actions.changeOrder({ items, _id }));
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <View style={{ flex: 4 }}>
        <Text style={styles.item}>{item.clientName}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text style={styles.item}>
          {item.createAt.toJSON().slice(0, 10).split("-").reverse().join("/")}
        </Text>
      </View>
      <View style={{ flex: 0.6 }}>
        <Text style={styles.item}>{item.sum.toFixed(2)}</Text>
      </View>
      <View style={{ flex: 1 }}>
        <Text
          style={[
            styles.item,
            { color: item.status === "Збережено" ? "red" : "green" },
          ]}
        >
          {item.status}
        </Text>
      </View>
      <View style={[styles.btnWrap, { flex: 2 }]}>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sendBtn}
          onPress={() => handleDeleteBtn(item)}
        >
          <Text style={styles.sendBtnText}>Видалити</Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sendBtn}
          onPress={() => handleChangeBtn(item)}
        >
          <Text style={styles.sendBtnText}>Змінити</Text>
        </TouchableOpacity>

        <TouchableOpacity
          activeOpacity={0.7}
          style={styles.sendBtn}
          onPress={() => handleSendBtn(item)}
        >
          <Text style={styles.sendBtnText}>Надіслати</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Всі замовлення</Text>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 4 }}>
          <Text style={styles.priceHeaderText}>Клієнт</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Дата</Text>
        </View>
        <View style={{ flex: 0.6 }}>
          <Text style={styles.priceHeaderText}>Сума</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Статус</Text>
        </View>
        <View style={{ flex: 2 }}>
          <Text style={styles.priceHeaderText}>Дія</Text>
        </View>
      </View>
      <FlatList
        data={allOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item._id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  catalogContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 7,
    marginBottom: 8,
    backgroundColor: "#e7f4f6",
    borderBottomWidth: 1,
    borderColor: "#223344",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    textAlign: "center",
    fontFamily: "roboto.bold",
    fontSize: 20,
  },
  priceHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 5,
    marginBottom: 3,
    paddingVertical: 3,
  },
  priceHeaderText: {
    fontFamily: "roboto.medium",
    fontSize: 18,
  },
  item: {
    overflow: "hidden",
    flexWrap: "wrap",
    fontFamily: "roboto.medium",
    fontSize: 16,
    marginRight: 5,
    paddingVertical: 10,
    borderBottomWidth: 1,
  },
  btnWrap: { flexDirection: "row" },
  sendBtn: {
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    height: 40,
    backgroundColor: "#49b1e6",
    borderRadius: 100,
    marginRight: 10,
  },
  sendBtnText: {
    fontFamily: "roboto.regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
