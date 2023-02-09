import * as FileSystem from "expo-file-system";

export const updatePrice = async () => {
  FileSystem.downloadAsync(
    "https://drive.google.com/uc?export=download&confirm=no_antivirus&id=15CauftMFjNWp9LALRtVi8Zkfcpydv8tl",
    FileSystem.documentDirectory + "price.json"
  )
    .then(({ uri }) => {
      console.log("Finished downloading to ", uri);
    })
    .catch((error) => {
      console.error(error);
    });
};
