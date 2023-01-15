import { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { sendOrderByMail } from "../api/sendOrderByMail";
import { DatePicker } from "../components/DatePicker";
import { ConfirmModal } from "../components/ConfirmModal";

//Icons
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
//DB
import OrdersContext, { Orders } from "../db/schema";
const { useRealm, useQuery, useObject } = OrdersContext;

import Realm from "realm";
import { realmConfig } from "../db/schema";
//Redux
import { useDispatch } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";

export const AllOrdersScreen = () => {
  const dispatch = useDispatch();
  const [allOrders, setAllOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  //Date Picker attributes
  const [range, setRange] = useState({
    startDate: undefined,
    endDate: undefined,
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (!range.startDate || !range.endDate) {
      setOpen(true);
    }
  }, []);

  const onDismiss = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const onConfirm = useCallback(
    ({ startDate, endDate }) => {
      setOpen(false);
      setRange({ startDate, endDate });
    },
    [setOpen, setRange]
  );
  //End of Date Picker
  const orders = useQuery(Orders);
  useEffect(() => {
    if (range.endDate && range.startDate) {
      const filteredOrders = orders.filtered(
        "createAt >= $0  && createAt <= $1",
        range.startDate,
        range.endDate
      );
      setAllOrders(filteredOrders);
    }
  }, [range]);

  const handleSelectOrder = (_id) => {
    setSelectedOrder(_id);
  };

  const handleSendBtn = async (_id) => {
    try {
      dispatch(cartSlice.actions.isLoading(true));
      await sendOrderByMail(_id);
    } catch (e) {
      alert("Замовлення не відправлене", e);
    } finally {
      dispatch(cartSlice.actions.isLoading(false));
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

  const handleDeleteBtn = () => {
    setShowConfirmModal(true);
  };
  const handleConfirmDelete = async () => {
    const db = await Realm.open(realmConfig);
    const order = Realm.objectForPrimaryKey("Orders", selectedOrder);
    db.write(() => {
      db.delete(order);
    });
  };
  const handleRejectDelete = () => {
    setShowConfirmModal(false);
  };

  const renderItem = ({ item }) => (
    <ScrollView
      contentContainerStyle={[
        styles.catalogContainer,
        {
          backgroundColor:
            selectedOrder == item._id.toString() ? "#49b1e6" : null,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.wrapper}
        onPress={() => handleSelectOrder(item._id)}
      >
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
        <View style={[styles.btnWrap, { flex: 2 }]}></View>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Всі замовлення</Text>
        <View>
          <FontAwesome
            onPress={() => setOpen(true)}
            name="calendar"
            size={35}
            color="black"
          />
        </View>
        <View style={styles.btnWrap}>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sendBtn}
            onPress={handleDeleteBtn}
          >
            <MaterialIcons name="delete-forever" size={35} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sendBtn}
            onPress={() => handleChangeBtn(item)}
          >
            <Entypo name="edit" size={35} color="#49b1e6" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.sendBtn}
            onPress={handleSendBtn}
          >
            <FontAwesome name="send" size={35} color="green" />
          </TouchableOpacity>
        </View>
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
      <DatePicker
        open={open}
        onDismiss={onDismiss}
        range={range}
        onConfirm={onConfirm}
      />
      <ConfirmModal
        showModal={showConfirmModal}
        onConfirm={handleConfirmDelete}
        onReject={handleRejectDelete}
      >
        Підвердіть видалення замовлення
      </ConfirmModal>
    </View>
  );
};

const styles = StyleSheet.create({
  catalogContainer: {
    paddingHorizontal: 5,
  },
  wrapper: {
    flexDirection: "row",
  },
  topBar: {
    paddingHorizontal: 10,
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
  btnWrap: { flexDirection: "row" },
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
  sendBtnText: {
    fontFamily: "roboto.regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
