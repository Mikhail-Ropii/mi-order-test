import {
  StyleSheet,
  Modal,
  View,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";

export const OrderInfoModal = ({ showModal, onCloseModal, orderInfo }) => {
  const { clientName, discount, items } = orderInfo;

  const renderItem = ({ item }) => (
    <View style={styles.listContainer}>
      <View style={styles.itemContainer}>
        <View style={{ flex: 1, alignSelf: "stretch" }}>
          <Text numberOfLines={1} style={styles.item}>
            {item.article}
          </Text>
        </View>
        <View style={{ flex: 7, alignSelf: "stretch" }}>
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
    </View>
  );

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <View>
            <Text>Клієнт: {clientName}</Text>
            <Text>Знижка: {discount}</Text>
          </View>
          <View>
            <FlatList
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
    height: "80%",
    width: "90%",
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
  listContainer: {},
  itemContainer: { flexDirection: "row" },
  cancelBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    paddingHorizontal: 15,
    backgroundColor: "green",
    marginTop: 20,
    borderRadius: 20,
  },
  cancelBtnText: {
    color: "white",
    fontFamily: "roboto.medium",
    fontSize: 20,
  },
});
