import { useState } from "react";
import { StyleSheet, Modal, View, TouchableOpacity, Text } from "react-native";
import { NumPad } from "./NumPad";

export const SearchByArticleModal = ({
  showModal,
  onCloseModal,
  onSetSearchValue,
}) => {
  const [numPadImput, setNumPadImput] = useState("");

  const handleItemClick = (value) => {
    if (numPadImput.length < 10) {
      setNumPadImput(numPadImput + value);
    }
  };

  const handleDeleteItem = () => {
    setNumPadImput(numPadImput.substring(0, numPadImput.length - 1));
  };

  const handleSubmitNumPad = () => {
    onSetSearchValue(numPadImput);
    setNumPadImput("");
    onCloseModal();
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={styles.numPad}>
            <View style={styles.numPadValue}>
              <Text style={styles.numPadValueText}>{numPadImput}</Text>
            </View>
            <NumPad
              onItemClick={handleItemClick}
              onDeleteItem={handleDeleteItem}
              onSubmit={handleSubmitNumPad}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.cancelBtn}
            onPress={() => {
              onCloseModal();
              setNumPadImput("");
            }}
          >
            <Text style={styles.btnText}>Відміна</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modal: {
    paddingVertical: 20,
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
  numPadValue: {
    alignItems: "center",
  },
  numPadValueText: {
    fontFamily: "roboto.medium",
    fontSize: 25,
  },
  submitBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "70%",
    backgroundColor: "green",
    marginTop: 20,
    borderRadius: 20,
  },
  cancelBtn: {
    alignSelf: "center",
    alignItems: "center",
    paddingVertical: 15,
    width: "70%",
    backgroundColor: "red",
    marginTop: 20,
    borderRadius: 20,
  },
  btnText: {
    color: "white",
    fontFamily: "roboto.medium",
    fontSize: 20,
  },
});
