import { Text, StyleSheet, View } from "react-native";
import DoubleClick from "react-native-double-tap";

export const CatalogList = ({
  item,
  selectedProduct,
  setSelectedProduct,
  addProduct,
}) => {
  return (
    <View
      style={[
        styles.catalogContainer,
        {
          backgroundColor: selectedProduct == item.article ? "#49b1e6" : null,
        },
      ]}
    >
      <DoubleClick
        singleTap={() => {
          setSelectedProduct(item.article);
        }}
        doubleTap={() => addProduct(item.article)}
      >
        <View style={styles.wraper}>
          <View style={styles.itemContainer}>
            <View style={{ flex: 1, alignSelf: "stretch" }}>
              <Text numberOfLines={1} style={styles.item}>
                {item.article}
              </Text>
            </View>
            <View style={{ flex: 8, alignSelf: "stretch" }}>
              <Text numberOfLines={1} style={styles.item}>
                {item.name}
              </Text>
            </View>
            <View style={{ flex: 0.6, alignSelf: "stretch" }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.item,
                  {
                    fontSize: 18,
                    color: item.availability === "Так" ? "green" : "red",
                  },
                ]}
              >
                {item.availability === "Так" ? "+" : "-"}
              </Text>
            </View>
            <View style={{ flex: 0.8, alignSelf: "stretch" }}>
              <Text numberOfLines={1} style={styles.item}>
                {item.minPackQty}/{item.bigPackQty}
              </Text>
            </View>
            <View style={{ flex: 1, alignSelf: "stretch" }}>
              <Text
                numberOfLines={1}
                style={[
                  styles.item,
                  { color: item.isDiscount === "Ні" ? "red" : "inherit" },
                ]}
              >
                {item.price.toFixed(2)}
              </Text>
            </View>
          </View>
        </View>
      </DoubleClick>
    </View>
  );
};

const styles = StyleSheet.create({
  catalogContainer: {
    paddingHorizontal: 5,
    borderBottomWidth: 1,
    borderColor: "grey",
  },
  wraper: {
    flexDirection: "row",
  },
  itemContainer: {
    flex: 1,
    alignSelf: "stretch",
    flexDirection: "row",
  },
  item: {
    overflow: "hidden",
    flexWrap: "wrap",
    fontFamily: "roboto.medium",
    fontSize: 15,
    marginRight: 5,
    paddingVertical: 14,
  },
});
