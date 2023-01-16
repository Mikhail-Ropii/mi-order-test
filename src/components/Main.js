import { NavigationContainer } from "@react-navigation/native";
import { UseRoute } from "../routes/router";
import { useSelector } from "react-redux";
import { SafeAreaView } from "react-native";
import { ActivityModal } from "../components/ActivityModal";

export const Main = () => {
  const isLoading = useSelector((state) => state.cart.isLoading);
  const routing = UseRoute();

  return (
    <NavigationContainer>
      {isLoading && <ActivityModal />}
      {routing}
    </NavigationContainer>
  );
};
