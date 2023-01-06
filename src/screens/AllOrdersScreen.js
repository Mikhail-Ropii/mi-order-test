import { useEffect, useState } from "react";
import {
  FlatList,
  View,
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { sendOrderByMail } from "../api/sendOrderByMail";

export const AllOrdersScreen = () => {
  const [allOrders, setAllOrders] = useState([]);

  console.log(allOrders);

  useEffect(() => {
    const getAllOrders = async () => {
      try {
        const orders = await AsyncStorage.getAllKeys();
        setAllOrders(orders);
      } catch (e) {}
    };
    getAllOrders();
  }, []);

  const handleSendOrder = async (item) => {
    try {
      await sendOrderByMail(item);
    } catch (e) {
      alert("Заказ не отправлен", e.message);
    }
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <Text style={styles.item}>{item}</Text>
      <TouchableOpacity
        activeOpacity={0.7}
        style={styles.sendBtn}
        onPress={() => handleSendOrder(item)}
      >
        <Text style={styles.sendBtnText}>Отправить</Text>
      </TouchableOpacity>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Все заказы</Text>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 4 }}>
          <Text style={styles.priceHeaderText}>Клиент</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Дата</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Сумма</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Действие</Text>
        </View>
      </View>
      <FlatList
        data={allOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 5,
  },
  catalogContainer: {
    flexDirection: "row",
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
    marginRight: 10,
    maxWidth: "100%",
    height: 50,
    borderBottomWidth: 1,
    padding: 15,
  },
  sendBtn: {
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    padding: 7,
    height: 40,
    backgroundColor: "#49b1e6",
    borderRadius: 100,
  },
  sendBtnText: {
    fontFamily: "roboto.regular",
    fontSize: 16,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
