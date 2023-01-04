import { FlatList, Text, ScrollView, StyleSheet, View } from "react-native";
import DoubleClick from "react-native-double-tap";
import { useState } from "react";
import { OrderModal } from "../components/OrderModal";
import { ClientNameModal } from "../components/ClientNameModal";
//Api
import { saveOrderToStorage } from "../api/saveOrderToStorage";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";
//Icons
import { FontAwesome } from "@expo/vector-icons";

export const OrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showModal, setShowModal] = useState(false);
  const [showClientNameModal, setShowClientNameModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState();
  const [currentQty, setCurrentQty] = useState();

  console.log(cart);

  const selectProduct = (article, currentQty) => {
    setCurrentQty(currentQty);
    setCurrentArticle(article);
    setShowModal(true);
  };

  const handleChangeQty = (qty) => {
    dispatch(cartSlice.actions.changeQty({ qty, currentArticle }));
    closeQtyModal();
  };

  const closeQtyModal = () => {
    setShowModal(false);
  };

  const closeClientNameModal = () => {
    setShowClientNameModal(false);
  };

  const openModalForSave = () => {
    setShowClientNameModal(true);
  };

  const handleSetNameAndSave = (clientName) => {
    saveOrderToStorage({ cart, clientName });
    closeClientNameModal();
  };

  const handleOnPress = (art) => {
    dispatch(cartSlice.actions.deleteProduct(art));
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.item}>{item.article}</Text>
      <DoubleClick doubleTap={() => selectProduct(item.article, item.qty)}>
        <Text style={styles.item}>{item.name}</Text>
      </DoubleClick>
      <Text style={styles.item}>{item.price}</Text>
      <Text style={styles.item}>{item.qty}</Text>
      <View>
        <FontAwesome
          onPress={() => handleOnPress(item.article)}
          name="remove"
          size={24}
          color="black"
        />
      </View>
    </ScrollView>
  );

  return (
    <>
      <View>
        <Text style={styles.title}>Текущий заказ</Text>
        <FontAwesome
          onPress={openModalForSave}
          name="save"
          size={24}
          color="black"
        />
      </View>
      <FlatList
        data={cart}
        renderItem={renderItem}
        keyExtractor={(item) => item.article}
      />
      <OrderModal
        showModal={showModal}
        changeQty={handleChangeQty}
        onCloseModal={closeQtyModal}
        currentQty={currentQty}
      />
      <ClientNameModal
        showModal={showClientNameModal}
        onCloseModal={closeClientNameModal}
        onSetNameAndSave={handleSetNameAndSave}
      />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "space-between",
    flexDirection: "row",
  },
  title: {
    fontFamily: "roboto.bold",
  },
  item: {
    marginRight: 10,
    maxWidth: "100%",
    height: 50,
    borderBottomWidth: 1,
    padding: 15,
  },
});
