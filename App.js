import { useEffect, useCallback } from "react";
import { useFonts } from "expo-font";
import {
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
} from "react-native";
import { Provider } from "react-redux";
import { store } from "./src/redux/store";
import * as SplashScreen from "expo-splash-screen";
import { Main } from "./src/components/Main";
//DB
import OrdersContext from "./src/db/schema";
const { RealmProvider } = OrdersContext;

export default function App() {
  const [fontsLoaded] = useFonts({
    "roboto.bold": require("./assets/fonts/Roboto-Bold.ttf"),
    "roboto.medium": require("./assets/fonts/Roboto-Medium.ttf"),
    "roboto.regular": require("./assets/fonts/Roboto-Regular.ttf"),
  });

  useEffect(() => {
    async function prepare() {
      await SplashScreen.preventAutoHideAsync();
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <KeyboardAvoidingView
      onLayout={onLayoutRootView}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
    >
      <StatusBar hidden={true} />
      <Provider store={store}>
        <RealmProvider>
          <Main />
        </RealmProvider>
      </Provider>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    flex: 1,
    backgroundColor: "#fff",
  },
});
