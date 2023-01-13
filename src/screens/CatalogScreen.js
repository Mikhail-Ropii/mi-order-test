import BigList from "react-native-big-list";
import {
  Text,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import price from "../files/price.json";
import DoubleClick from "react-native-double-tap";
import { useEffect, useRef, useState, useMemo } from "react";
import { OrderModal } from "../components/OrderModal";
import { SearchByArticleModal } from "../components/SearchByArticleModal";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";
//Icons
import { FontAwesome } from "@expo/vector-icons";

export const CatalogScreen = () => {
  //Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount);
  //State
  const initialValue = { qty: 0 };
  const [addProduct, setAddProduct] = useState(initialValue);
  const [showModal, setShowModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchByNameValue, setSearchByNameValue] = useState("");

  const catalogRef = useRef();

  const foundProducts = useMemo(() => {
    return (
      price?.filter((product) =>
        product.name
          .toLowerCase()
          .trim()
          .includes(searchByNameValue.toLowerCase().trim())
      ) ?? []
    );
  }, [price, searchByNameValue]);

  useEffect(() => {
    let index = 0;
    foundProducts.findIndex((item, idx) => {
      if (item.article == searchValue) {
        index = idx;
      }
    });
    catalogRef.current.scrollToIndex({ index: index, animated: true });
  }, [searchValue]);

  useEffect(() => {
    if (addProduct.qty !== 0) {
      dispatch(cartSlice.actions.addToCart(addProduct));
    }
  }, [addProduct]);

  const createNewProduct = (art, name, price) => {
    if (cart.find(({ article }) => article === art)) {
      alert("Товар уже в заказе");
      return;
    }
    setShowModal(true);
    const product = {
      article: art,
      name,
      price,
      qty: 0,
      discount: discount,
      priceDiscount: (price * (100 - discount)) / 100,
    };
    setAddProduct(product);
  };
  const addQty = (qty) => {
    setAddProduct({ ...addProduct, qty, sum: addProduct.priceDiscount * qty });
    closeQtyModal();
  };

  const closeQtyModal = () => {
    setShowModal(false);
  };

  const closeSearchModal = () => {
    setShowSearchModal(false);
  };

  const findByArticle = () => {
    setShowSearchModal(true);
  };

  const removeInputValue = () => {
    setSearchByNameValue("");
  };

  const renderItem = ({ item }) => (
    <ScrollView contentContainerStyle={styles.catalogContainer}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.article}</Text>
        </View>
        <View style={{ flex: 8, alignSelf: "stretch" }}>
          <DoubleClick
            doubleTap={() =>
              createNewProduct(item.article, item.name, item.price)
            }
          >
            <Text numberOfLines={1} style={styles.item}>
              {item.name}
            </Text>
          </DoubleClick>
        </View>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text
            style={[
              styles.item,
              {
                fontSize: 20,
                color: item.availability === "Так" ? "green" : "red",
              },
            ]}
          >
            {item.availability === "Так" ? "+" : "-"}
          </Text>
        </View>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.packQty}</Text>
        </View>
        <View style={{ flex: 0.8, alignSelf: "stretch" }}>
          <Text style={styles.item}>{item.price.toFixed(2)}</Text>
        </View>
      </View>
    </ScrollView>
  );

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.searchBtn} onPress={findByArticle}>
          <FontAwesome
            style={styles.searchIcon}
            name="search"
            size={24}
            color="black"
          />
          <Text style={styles.searchBtnText}>Пошук по коду</Text>
        </TouchableOpacity>
        <View style={styles.inputSection}>
          <TextInput
            style={styles.input}
            placeholder={"Пошук по найменуванню"}
            autoFocus={false}
            value={searchByNameValue.toString()}
            onChangeText={(value) => setSearchByNameValue(value)}
          ></TextInput>
          <FontAwesome
            onPress={removeInputValue}
            name="remove"
            size={30}
            color="red"
          />
        </View>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Код</Text>
        </View>
        <View style={{ flex: 10 }}>
          <Text style={styles.priceHeaderText}>Найменування</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Склад</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Уп.</Text>
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Ціна</Text>
        </View>
      </View>
      <BigList
        ref={catalogRef}
        data={foundProducts}
        renderItem={renderItem}
        keyExtractor={(item) => item.article.toString()}
      />
      <SearchByArticleModal
        showModal={showSearchModal}
        onCloseModal={closeSearchModal}
        onSetSearchValue={setSearchValue}
      />
      <OrderModal
        showModal={showModal}
        changeQty={addQty}
        onCloseModal={closeQtyModal}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  topBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
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
  searchBtn: {
    flexDirection: "row",
  },
  searchIcon: {
    marginRight: 10,
  },
  searchBtnText: {
    fontFamily: "roboto.medium",
    fontSize: 15,
    alignSelf: "center",
  },
  inputSection: {
    flexDirection: "row",
  },
  input: {
    width: 300,
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
