import {
  Dimensions,
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";
const DeviceWidth = Dimensions.get("window").width;

export const NumPad = ({ onItemClick, onDeleteItem, onSubmit }) => {
  return (
    <View style={styles.container}>
      <View>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(1)}>
          <Text style={styles.digitText}>1</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(4)}>
          <Text style={styles.digitText}>4</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(7)}>
          <Text style={styles.digitText}>7</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={onDeleteItem}>
          <Text style={styles.digitText}>&#60;</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(2)}>
          <Text style={styles.digitText}>2</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(5)}>
          <Text style={styles.digitText}>5</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(8)}>
          <Text style={styles.digitText}>8</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(0)}>
          <Text style={styles.digitText}>0</Text>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(3)}>
          <Text style={styles.digitText}>3</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(6)}>
          <Text style={styles.digitText}>6</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.digit} onPress={() => onItemClick(9)}>
          <Text style={styles.digitText}>9</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.digit, { backgroundColor: "green" }]}
          onPress={onSubmit}
        >
          <Text style={[styles.digitText, { color: "white" }]}>OK</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
  },
  digit: {
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 1,
    backgroundColor: "silver",
    borderRadius: 10,
  },
  digitText: {
    fontFamily: "roboto.medium",
    fontSize: 35,
  },
});
