import { StyleSheet, Modal, View, Text, TouchableOpacity } from "react-native";

export const ConfirmModal = ({ showModal, onConfirm, onReject, children }) => {
  return (
    <Modal style={styles.modal} visible={showModal} transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modal}>
          <Text style={styles.title}>{children}</Text>
          <View style={styles.btnContainer}>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={onConfirm}
            >
              <Text style={styles.btnText}>Так</Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.7}
              style={styles.btn}
              onPress={onReject}
            >
              <Text style={styles.btnText}>Ні</Text>
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
    fontFamily: "roboto.medium",
    fontSize: 21,
    lineHeight: 19,

    color: "#FFFFFF",
  },
});
