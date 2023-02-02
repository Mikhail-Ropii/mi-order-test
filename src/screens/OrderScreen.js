import {
  FlatList,
  Text,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
} from "react-native";
import { useIsFocused } from "@react-navigation/native";
import DoubleClick from "react-native-double-tap";
import { useEffect, useState } from "react";
import { OrderModal } from "../components/OrderModal";
import { ClientNameModal } from "../components/ClientNameModal";
import { ConfirmModal } from "../components/ConfirmModal";
//Api
import { saveOrderToStorage } from "../api/saveOrderToStorage";
import { SaveExistingOrder } from "../api/SaveExistingOrder";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";
//Icons
import { FontAwesome } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";

export const OrderScreen = () => {
  const isFocused = useIsFocused();
  const dispatch = useDispatch();
  const discount = useSelector((state) => state.cart.discount);
  const id = useSelector((state) => state.cart._id);
  const cart = useSelector((state) => state.cart.cart);
  //State
  const [cartSum, setCartSum] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showClientNameModal, setShowClientNameModal] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [currentItem, setCurrentItem] = useState();
  const [currentQty, setCurrentQty] = useState();

  useEffect(() => {
    dispatch(cartSlice.actions.changeDiscount());
  }, [discount]);

  useEffect(() => {
    const sum = cart.reduce(
      (total, { qty, priceDiscount }) => qty * priceDiscount + total,
      0
    );
    setCartSum(sum);
  }, [cart]);

  const selectProduct = (item) => {
    setCurrentQty(item.qty);
    setCurrentItem(item);
    setShowModal(true);
  };

  const handleConfirmDelete = () => {
    dispatch(cartSlice.actions.clearOrder());
    setShowConfirmModal(false);
  };
  const handleRejectDelete = () => {
    setShowConfirmModal(false);
  };

  const handleChangeQty = (qty) => {
    dispatch(cartSlice.actions.changeQty({ ...currentItem, qty }));
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
      alert("Замовлення порожне");
      return;
    }
    setShowClientNameModal(true);
  };

  const handleSetNameAndSave = async (clientName) => {
    if (id) {
      try {
        await SaveExistingOrder({ id, cart, cartSum, clientName, discount });
        dispatch(cartSlice.actions.clearOrder());
      } catch (error) {
        console.log(error);
        alert("Замовлення не збережено");
      } finally {
        closeClientNameModal();
        return;
      }
    }
    try {
      await saveOrderToStorage({ cart, cartSum, clientName, discount });
      dispatch(cartSlice.actions.clearOrder());
    } catch (error) {
      alert("Замовлення не збережено");
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
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.article}</Text>
        </View>
        <View style={{ flex: 6, alignSelf: "stretch" }}>
          <DoubleClick doubleTap={() => selectProduct(item)}>
            <Text numberOfLines={1} style={styles.item}>
              {item.name}
            </Text>
          </DoubleClick>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.price.toFixed(2)}</Text>
        </View>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.priceDiscount.toFixed(2)}</Text>
        </View>
        <View style={{ flex: 0.5, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.qty}</Text>
        </View>
        <View style={{ flex: 1.1, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.sum.toFixed(2)}</Text>
        </View>
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
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
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Поточне замовлення</Text>
        <View style={styles.discountWrap}>
          <Text style={styles.discountText}>Знижка, %</Text>
          <TextInput
            style={styles.input}
            autoFocus={false}
            numberOfLines={1}
            keyboardType={"numeric"}
            maxLength={2}
            value={discount}
            onChangeText={(value) =>
              dispatch(cartSlice.actions.setDiscount(parseInt(value)))
            }
          ></TextInput>
        </View>
        <View style={styles.sumWrap}>
          <Text style={styles.sumText}>Сума замовлення:</Text>
          <Text style={styles.cartSumText}>{cartSum.toFixed(2)}</Text>
        </View>
        <View style={styles.topBarIconWrap}>
          <MaterialIcons
            style={{ marginRight: 25 }}
            onPress={openModalForSave}
            name="save"
            size={35}
            color="green"
          />
          <MaterialIcons
            onPress={() => setShowConfirmModal(true)}
            name="delete-forever"
            size={35}
            color="red"
          />
        </View>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Код</Text>
        </View>
        <View style={{ flex: 6 }}>
          <Text style={styles.priceHeaderText}>Найменування</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Ціна</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Ціна(%)</Text>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text style={styles.priceHeaderText}>Кіл.</Text>
        </View>
        <View style={{ flex: 1.1 }}>
          <Text style={styles.priceHeaderText}>Сума</Text>
        </View>
        <View style={{ flex: 0.8 }}>
          <Text style={styles.priceHeaderText}>Видал.</Text>
        </View>
      </View>
      {isFocused && (
        <FlatList
          data={cart}
          renderItem={renderItem}
          keyExtractor={(item) => item.article}
        />
      )}
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
      <ConfirmModal
        showModal={showConfirmModal}
        onConfirm={handleConfirmDelete}
        onReject={handleRejectDelete}
      >
        Підвердіть очищення замовлення
      </ConfirmModal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 120,
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
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
  sumWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  sumText: {
    marginRight: 8,
    fontFamily: "roboto.medium",
    fontSize: 18,
  },
  cartSumText: {
    fontFamily: "roboto.medium",
    fontSize: 20,
  },
  topBarIconWrap: {
    flexDirection: "row",
  },
  catalogContainer: {
    flexDirection: "row",
    paddingHorizontal: 5,
    justifyContent: "space-between",
    borderBottomWidth: 1,
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
  discountWrap: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  discountText: {
    marginRight: 8,
    fontFamily: "roboto.medium",
    fontSize: 18,
  },
  input: {
    fontSize: 16,
    width: 40,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginRight: 10,
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
