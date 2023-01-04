import { useEffect, useState } from "react";
import {
  FlatList,
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
    await sendOrderByMail(item);
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.container}>
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
    <>
      <FlatList
        data={allOrders}
        renderItem={renderItem}
        keyExtractor={(item) => item}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
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
