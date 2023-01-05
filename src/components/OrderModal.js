import { useEffect, useState } from "react";
import { StyleSheet, Modal, View, Button, Text } from "react-native";
import { NumPad } from "frontatish";

export const OrderModal = ({
  showModal,
  changeQty,
  onCloseModal,
  currentQty = "1",
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
    changeQty(numPadImput.replace(/^0+/, ""));
    setNumPadImput(currentQty);
    onCloseModal();
  };

  return (
    <Modal visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <View style={styles.numPad}>
            <Text>{numPadImput}</Text>
            <NumPad
              onItemClick={handleItemClick}
              onDeleteItem={handleDeleteItem}
              onSubmit={handleSubmitNumPad}
            />
          </View>
          <Button
            onPress={() => {
              onCloseModal();
              setNumPadImput(currentQty);
            }}
            title="X"
          ></Button>
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
    display: "flex",
    width: 300,
    height: 300,
    backgroundColor: "white",

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
});
