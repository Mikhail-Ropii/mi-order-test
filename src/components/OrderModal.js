import { useEffect, useState } from "react";
import { StyleSheet, Modal, View, TouchableOpacity, Text } from "react-native";
import { NumPad } from "./NumPad";

export const OrderModal = ({
  showModal,
  changeQty,
  onCloseModal,
  onSetOffAutoQtyModal = null,
  currentQty = "",
}) => {
  const [numPadImput, setNumPadImput] = useState("");

  useEffect(() => {
    setNumPadImput(currentQty);
  }, [currentQty]);

  const handleItemClick = (value) => {
    if (numPadImput.length < 10) {
      setNumPadImput(numPadImput + value);
    }
  };

  const handleDeleteItem = () => {
    setNumPadImput(numPadImput.substring(0, numPadImput.length - 1));
  };

  const handleSubmitNumPad = () => {
    if (numPadImput < 1) {
      return;
    }
    onCloseModal();
    changeQty(numPadImput.replace(/^0+/, ""));
    setNumPadImput(currentQty);
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>Кількість</Text>
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
              if (onSetOffAutoQtyModal) {
                onSetOffAutoQtyModal();
              }
              onCloseModal();
              setNumPadImput(currentQty);
            }}
          >
            <Text style={styles.cancelBtnText}>Відміна</Text>
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
    paddingVertical: 10,
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
  title: {
    fontFamily: "roboto.medium",
    fontSize: 18,
    alignSelf: "center",
  },
  numPadValue: {
    alignItems: "center",
  },
  numPadValueText: {
    fontFamily: "roboto.medium",
    fontSize: 25,
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
  cancelBtnText: {
    color: "white",
    fontFamily: "roboto.medium",
    fontSize: 20,
  },
});
