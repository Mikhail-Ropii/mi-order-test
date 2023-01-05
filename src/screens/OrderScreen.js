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
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <View style={{ flex: 1, alignSelf: "stretch", flexDirection: "row" }}>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text>{item.article}</Text>
        </View>
        <View style={{ flex: 7, alignSelf: "stretch", width: "80%" }}>
          <Text>{item.name}</Text>
        </View>
        <View style={{ flex: 3, alignSelf: "stretch" }}>
          <Text>{item.price}</Text>
        </View>
        <View style={{ flex: 3, alignSelf: "stretch" }}>
          <Text>{item.article}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text>sdkjfhsjkdfkjkldjglkdjfgdlfk</Text>
        </View>
      </View>
      {/* <DoubleClick doubleTap={() => selectProduct(item.article, item.qty)}>
        <View style={styles.itemContainer}>
          <Text style={styles.item}>{item.article}</Text>
          <Text numberOfLines={1} style={styles.item}>
            {item.name}
          </Text>
          <Text style={styles.item}>{item.price}</Text>
        </View>
      </DoubleClick>
      <FontAwesome
        style={styles.removeIcon}
        onPress={() => handleOnPress(item.article)}
        name="remove"
        size={32}
        color="red"
      /> */}
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
  // container: {
  //   justifyContent: "space-between",
  //   flexDirection: "row",
  // },
  catalogContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
  },
  itemContainer: {
    flexDirection: "row",
    borderTopWidth: 1,
    borderColor: "blue",
    justifyContent: "space-between",
  },
  item: {
    maxWidth: "80%",
    overflow: "hidden",
    flexWrap: "wrap",
    fontFamily: "roboto.medium",
    fontSize: 18,
    marginRight: 10,
    paddingVertical: 15,
  },
  removeIcon: {
    marginLeft: "auto",
  },
  title: {
    textAlign: "center",
    fontFamily: "roboto.bold",
    fontSize: 15,
  },
});
