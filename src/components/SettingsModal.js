import Checkbox from "expo-checkbox";
import { StyleSheet, Modal, View, TouchableOpacity, Text } from "react-native";

export const SettingsModal = ({
  showModal,
  autoQtyModal,
  setAutoQtyModal,
  onCloseModal,
}) => {
  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.container}>
        <View style={styles.modal}>
          <Checkbox
            style={styles.checkbox}
            value={autoQtyModal}
            onValueChange={setAutoQtyModal}
          />
          <Text style={styles.text}>Підбирати товар при пошуку по коду</Text>
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
    paddingVertical: 20,
    paddingHorizontal: 20,
    display: "flex",
    width: 300,
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
  checkbox: {
    marginRight: 8,
  },
  text: {
    fontFamily: "roboto.regular",
    fontSize: 15,
  },
  cancelBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "70%",
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
