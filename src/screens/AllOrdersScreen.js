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
import { OrderInfoModal } from "../components/OrderInfoModal";

//Icons
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { Entypo } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
//DB
import OrdersContext, { Orders } from "../db/schema";
const { useRealm, useQuery, useObject } = OrdersContext;
//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";

export const AllOrdersScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const discount = useSelector((state) => state.cart.discount);
  const [allOrders, setAllOrders] = useState([]);
  const [orderInfo, setOrdeInfo] = useState();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showConfirmChangeModal, setShowConfirmChangeModal] = useState(false);
  const [showConfirmSendModal, setShowConfirmSendModal] = useState(false);
  const [showOrderInfoModal, setShowOrderInfoModal] = useState(false);

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
  const db = useRealm();
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

  const handleSendBtn = () => {
    setShowConfirmSendModal(true);
  };
  const handleRejectSend = () => {
    setShowConfirmSendModal(false);
  };
  const handleConfirmSend = async () => {
    try {
      dispatch(cartSlice.actions.isLoading(true));
      await sendOrderByMail(selectedOrder);
    } catch (e) {
      console.log(e);
    } finally {
      dispatch(cartSlice.actions.isLoading(false));
      setShowConfirmSendModal(false);
    }
  };

  const handleChangeBtn = () => {
    if (!selectedOrder) {
      alert("Виберіть замовлення");
      return;
    }
    setShowConfirmChangeModal(true);
  };
  const handleConfirmChange = () => {
    dispatch(cartSlice.actions.clearOrder());
    const foundOrder = allOrders.find(
      (order) => order._id.toString() == selectedOrder
    );
    const { items, _id, clientName } = foundOrder;
    items.map((el) => {
      const product = {
        article: el.article,
        name: el.name,
        price: el.price,
        qty: el.qty,
        priceDiscount: (el.price * (100 - discount)) / 100,
        sum: (el.qty * (el.price * (100 - discount))) / 100,
      };
      dispatch(cartSlice.actions.addToCart(product));
    });
    setShowConfirmChangeModal(false);
    dispatch(cartSlice.actions.changeDiscount());
    dispatch(cartSlice.actions.setCurrentClient({ _id, clientName }));
    navigation.navigate("Order");
  };
  const handleRejectChange = () => {
    setShowConfirmChangeModal(false);
  };

  const handleDeleteBtn = () => {
    if (!selectedOrder) {
      alert("Виберіть замовлення");
      return;
    }
    setShowConfirmModal(true);
  };
  const handleConfirmDelete = () => {
    const currentOrder = orders.filtered("_id= $0", selectedOrder);
    db.write(() => {
      db.delete(currentOrder);
    });
    setShowConfirmModal(false);
  };
  const handleRejectDelete = () => {
    setShowConfirmModal(false);
  };

  const getOrderInfo = ({ clientName, discount, items }) => {
    setOrdeInfo({ clientName, discount, items });
    setShowOrderInfoModal(true);
  };

  const renderItem = ({ item }) => (
    <View
      style={[
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
        <View style={{ flex: 7 }}>
          <Text numberOfLines={1} style={styles.item}>
            {item.clientName}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.item}>
            {item.createAt.toJSON().slice(0, 10).split("-").reverse().join("/")}
          </Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.item}>{item.sum.toFixed(2)}</Text>
        </View>
        <View style={{ flex: 1.2 }}>
          <Text
            style={[
              styles.item,
              { color: item.status === "Збережено" ? "red" : "green" },
            ]}
          >
            {item.status}
          </Text>
        </View>
        <View
          style={[
            styles.btnWrap,
            { flex: 0.8, alignSelf: "center", justifyContent: "center" },
          ]}
        >
          <AntDesign
            onPress={() => getOrderInfo(item)}
            name="infocirlce"
            size={30}
            color="black"
          />
        </View>
      </TouchableOpacity>
    </View>
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
            style={styles.btn}
            onPress={handleDeleteBtn}
          >
            <MaterialIcons name="delete-forever" size={35} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={handleChangeBtn}
          >
            <Entypo name="edit" size={35} color="#49b1e6" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.btn}
            onPress={handleSendBtn}
          >
            <FontAwesome name="send" size={35} color="green" />
          </TouchableOpacity>
        </View>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 7 }}>
          <Text style={styles.priceHeaderText}>Клієнт</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Дата</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Сума</Text>
        </View>
        <View style={{ flex: 1.2 }}>
          <Text style={styles.priceHeaderText}>Статус</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.priceHeaderText}>Инфо</Text>
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
      {orderInfo && (
        <OrderInfoModal
          onCloseModal={() => setShowOrderInfoModal(false)}
          showModal={showOrderInfoModal}
          orderInfo={orderInfo}
        />
      )}
      <ConfirmModal
        showModal={showConfirmModal}
        onConfirm={handleConfirmDelete}
        onReject={handleRejectDelete}
      >
        Підвердіть видалення замовлення
      </ConfirmModal>
      <ConfirmModal
        showModal={showConfirmChangeModal}
        onConfirm={handleConfirmChange}
        onReject={handleRejectChange}
      >
        Зміст поточного замовлення буде замінено.
      </ConfirmModal>
      <ConfirmModal
        showModal={showConfirmSendModal}
        onConfirm={handleConfirmSend}
        onReject={handleRejectSend}
      >
        Відправити замовлення?
      </ConfirmModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 95,
  },
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
  btn: {
    marginLeft: 10,
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
});
