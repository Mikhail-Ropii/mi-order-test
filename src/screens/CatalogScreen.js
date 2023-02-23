import BigList from "react-native-big-list";
import {
  Text,
  StyleSheet,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useEffect, useRef, useState, useMemo } from "react";
import { OrderModal } from "../components/OrderModal";
import { SearchByArticleModal } from "../components/SearchByArticleModal";
import { CatalogList } from "../components/CatalogList";
import { SettingsModal } from "../components/SettingsModal";
//Functional
import { updatePrice } from "../api/updatePrice";
import { setPriceToState } from "../api/setPriceToState";
import { setCatalogSettings } from "../api/setCatalogSettings";
import { getCatalogSettings } from "../api/getCatalogSettings";
//Redux
import { useDispatch, useSelector } from "react-redux";
import { cartSlice } from "../redux/cart/cartReducer";
//Icons
import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from "@expo/vector-icons";

export const CatalogScreen = () => {
  //Redux
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);
  const discount = useSelector((state) => state.cart.discount);
  //State
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showQtyModal, setShowQtyModal] = useState(false);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const [searchByNameValue, setSearchByNameValue] = useState("");
  const [price, setPrice] = useState([]);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [currentQty, setCurrentQty] = useState("");
  const [autoQtyModal, setAutoQtyModal] = useState(null);
  const [autoQtyModalOn, setAutoQtyModalOn] = useState(false);

  useEffect(() => {
    const getPriceAndSettings = async () => {
      try {
        const price = await setPriceToState();
        setPrice(price);
        const isAutoQtyModal = await getCatalogSettings();
        setAutoQtyModal(isAutoQtyModal);
      } catch (error) {}
    };
    getPriceAndSettings();
  }, []);

  useEffect(() => {
    if (autoQtyModal !== null) {
      setCatalogSettings(autoQtyModal);
    }
  }, [autoQtyModal]);

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
        setSelectedProduct(item.article);
      }
    });
    catalogRef.current.scrollToIndex({ index: index, animated: false });
  }, [searchValue]);

  const handleChangeQty = (qty) => {
    dispatch(cartSlice.actions.changeQty({ currentArticle, qty }));
  };

  const addProduct = (art) => {
    const currentProduct = cart.find((product) => product.article === art);
    if (currentProduct) {
      setCurrentQty(currentProduct.qty);
      setCurrentArticle(currentProduct.article);
      setShowQtyModal(true);
      return;
    }
    setCurrentQty("");
    const foundItem = foundProducts.find(({ article }) => article == art);
    if (foundItem) {
      setShowQtyModal(true);
      setCurrentArticle(foundItem.article);
    }
  };

  const addQty = (qty) => {
    if (cart.find((product) => product.article === currentArticle)) {
      handleChangeQty(qty);
    } else {
      const currentProduct = foundProducts.filter(
        (product) => product.article == currentArticle
      );
      const { article, name, price } = currentProduct[0];
      dispatch(
        cartSlice.actions.addToCart({
          article,
          name,
          price,
          priceDiscount: (price * (100 - discount)) / 100,
          qty,
          sum: ((price * (100 - discount)) / 100) * qty,
        })
      );
    }

    if (autoQtyModalOn) {
      setShowSearchModal(true);
    }
  };

  const findByArticle = () => {
    setShowSearchModal(true);
    if (searchByNameValue) {
      setSearchByNameValue("");
    }
  };

  const handleSetSearchValue = (art) => {
    setSearchValue(art);
    if (autoQtyModal) {
      setAutoQtyModalOn(true);
      addProduct(art);
    }
  };

  const handleUpdatePrice = async () => {
    try {
      dispatch(cartSlice.actions.isLoading(true));
      await updatePrice();
      const price = await setPriceToState();
      setPrice(price);
      alert("Каталог оновлено");
    } catch (error) {
      console.log(error);
      alert("Щось пішло не так:(");
    } finally {
      dispatch(cartSlice.actions.isLoading(false));
    }
  };

  const renderItem = useMemo(() => ({ item }) => (
    <CatalogList
      item={item}
      selectedProduct={selectedProduct}
      setSelectedProduct={setSelectedProduct}
      addProduct={addProduct}
    />
  ));

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <View style={{ flexDirection: "row" }}>
          <FontAwesome
            onPress={handleUpdatePrice}
            name="refresh"
            size={30}
            color="green"
          />
          <Ionicons
            style={styles.settingsIcon}
            onPress={() => setShowSettingsModal(true)}
            name="settings-sharp"
            size={30}
            color="grey"
          />
        </View>
        <View style={styles.searchBar}>
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
              onPress={() => setSearchByNameValue("")}
              name="remove"
              size={30}
              color="red"
            />
          </View>
        </View>
      </View>
      <View style={styles.priceHeader}>
        <View style={{ flex: 1 }}>
          <Text style={styles.priceHeaderText}>Код</Text>
        </View>
        <View style={{ flex: 8 }}>
          <Text style={styles.priceHeaderText}>Найменування</Text>
        </View>
        <View style={{ flex: 0.7 }}>
          <Text style={styles.priceHeaderText}>Ск.</Text>
        </View>
        <View style={{ flex: 0.8 }}>
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
        onCloseModal={() => setShowSearchModal(false)}
        onSetOffAutoQtyModal={() => setAutoQtyModalOn(false)}
        onSetSearchValue={handleSetSearchValue}
      />
      <OrderModal
        showModal={showQtyModal}
        changeQty={addQty}
        onCloseModal={() => setShowQtyModal(false)}
        onSetOffAutoQtyModal={() => setAutoQtyModalOn(false)}
        currentQty={currentQty}
      />
      <SettingsModal
        showModal={showSettingsModal}
        autoQtyModal={autoQtyModal}
        setAutoQtyModal={setAutoQtyModal}
        onCloseModal={() => setShowSettingsModal(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    paddingHorizontal: 5,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
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
  settingsIcon: { marginLeft: 20 },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 60,
  },
  searchBtn: {
    flexDirection: "row",
    marginRight: 40,
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
