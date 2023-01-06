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
import { MaterialIcons } from "@expo/vector-icons";

export const OrderScreen = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const [showModal, setShowModal] = useState(false);
  const [showClientNameModal, setShowClientNameModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState();
  const [currentQty, setCurrentQty] = useState();

  const selectProduct = (article, currentQty) => {
    setCurrentQty(currentQty);
    setCurrentArticle(article);
    setShowModal(true);
  };

  const clearOrder = () => {
    dispatch(cartSlice.actions.clearOrder());
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
    if (cart.length == 0) {
      alert("Заказ пустой");
      return;
    }
    setShowClientNameModal(true);
  };

  const handleSetNameAndSave = async (clientName) => {
    try {
      await saveOrderToStorage({ cart, clientName });
      dispatch(cartSlice.actions.clearOrder());
    } catch (e) {
      alert("Заказ не сохранен", e.message);
    } finally {
      closeClientNameModal();
    }
  };

  const handleOnPress = (art) => {
    dispatch(cartSlice.actions.deleteProduct(art));
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.article}</Text>
        </View>
        <View style={{ flex: 8, alignSelf: "stretch" }}>
          <DoubleClick doubleTap={() => selectProduct(item.article, item.qty)}>
            <Text numberOfLines={1} style={styles.item}>
              {item.name}
            </Text>
          </DoubleClick>
        </View>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.price}</Text>
        </View>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.qty}</Text>
        </View>
      </View>
      <View style={{ flex: 0.8, alignSelf: "stretch" }}>
        <FontAwesome
          style={styles.removeIcon}
          onPress={() => handleOnPress(item.article)}
          name="remove"
          size={32}
          color="red"
        />
      </View>
    </ScrollView>
  );

  return (
    <>
      <View style={styles.topBar}>
        <Text style={styles.title}>Текущий заказ</Text>
        <MaterialIcons
          onPress={openModalForSave}
          name="save"
          size={35}
          color="green"
        />
        <MaterialIcons
          onPress={clearOrder}
          name="delete-forever"
          size={35}
          color="red"
        />
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Код</Text>
        </View>
        <View style={{ flex: 8 }}>
          <Text style={styles.priceHeaderText}>Наименование</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Цена</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Цена(%)</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>%</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Сумма</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Удалить</Text>
        </View>
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
  catalogContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1.5,
    borderColor: "grey",
  },
  itemContainer: {
    flex: 16,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  item: {
    overflow: "hidden",
    flexWrap: "wrap",
    fontFamily: "roboto.medium",
    fontSize: 16,
    marginRight: 5,
    paddingVertical: 10,
  },
  removeIcon: {
    marginLeft: "auto",
    marginRight: 20,
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
});
