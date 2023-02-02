import { useState } from "react";
import { useSelector } from "react-redux";

import {
  StyleSheet,
  Modal,
  View,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { useEffect } from "react";

export const ClientNameModal = ({
  showModal,
  onSetNameAndSave,
  onCloseModal,
}) => {
  const [value, setValue] = useState("");
  const clientName = useSelector((state) => state.cart.clientName);

  useEffect(() => {
    if (clientName) {
      setValue(clientName);
      return;
    }
    setValue("");
  }, [clientName]);

  return (
    <Modal style={styles.modal} visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>Введіть ім'я клієнта</Text>
          <TextInput
            style={styles.input}
            autoFocus={true}
            value={value.toString()}
            onChangeText={(value) => setValue(value)}
          ></TextInput>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={() => {
                onSetNameAndSave(value);
              }}
            >
              <Text style={styles.btnText}>Зберегти</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={() => {
                onCloseModal();
              }}
            >
              <Text style={styles.btnText}>Відміна</Text>
            </TouchableOpacity>
          </View>
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
    padding: 30,
  },
  title: {
    fontFamily: "roboto.medium",
    fontSize: 20,
    marginBottom: 15,
    textAlign: "center",
  },
  input: {
    fontFamily: "roboto.regular",
    fontSize: 18,
    minWidth: 400,
    marginBottom: 40,
    borderWidth: 2,
    borderColor: "#000000",
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  btn: {
    marginTop: "auto",
    marginBottom: "auto",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    minWidth: 120,
    backgroundColor: "#49b1e6",
    borderRadius: 100,
  },
  btnText: {
    fontFamily: "roboto.regular",
    fontSize: 18,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
