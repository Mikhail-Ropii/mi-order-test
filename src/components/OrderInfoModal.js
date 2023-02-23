import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Text,
  FlatList,
  Dimensions,
} from "react-native";
const window = Dimensions.get("window");

export const OrderInfoModal = ({ showModal, onCloseModal, orderInfo }) => {
  const { clientName, discount, items } = orderInfo;

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.article}
        </Text>
      </View>
      <View style={{ flex: 6, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.name}
        </Text>
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.price.toFixed(2)}
        </Text>
      </View>
      <View style={{ flex: 1, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.priceDiscount.toFixed(2)}
        </Text>
      </View>
      <View style={{ flex: 0.5, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.qty}
        </Text>
      </View>
      <View style={{ flex: 1.2, alignSelf: "stretch" }}>
        <Text numberOfLines={1} style={styles.item}>
          {item.sum.toFixed(2)}
        </Text>
      </View>
    </View>
  );

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text style={styles.title}>Клієнт: {clientName}</Text>
            <Text style={styles.title}>Знижка: {discount}</Text>
          </View>
          <View>
            <FlatList
              style={styles.listContainer}
              data={items}
              renderItem={renderItem}
              keyExtractor={(item) => item.article}
            />
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.cancelBtn}
              onPress={() => {
                onCloseModal();
              }}
            >
              <Text style={styles.cancelBtnText}>Закрити</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    height: window.height * 0.8,
    width: window.width * 0.9,
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    backgroundColor: "#ebedeb",

    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  title: {
    fontFamily: "roboto.medium",
    fontSize: 17,
  },
  listContainer: {
    height: "65%",
  },
  itemContainer: { flexDirection: "row" },
  item: {
    fontFamily: "roboto.regular",
    fontSize: 15,
    marginBottom: 5,
  },
  cancelBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "green",
    marginTop: 18,
    borderRadius: 18,
  },
  cancelBtnText: {
    color: "white",
    fontFamily: "roboto.medium",
    fontSize: 18,
  },
});
