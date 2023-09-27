import { StyleSheet, Modal, View, ActivityIndicator } from "react-native";

export const ActivityModal = () => {
  return (
    <Modal visible={true} transparent={true} statusBarTranslucent={true}>
      <View style={styles.centeredView}>
        <ActivityIndicator size="large" color="#0000ff" />
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
});
