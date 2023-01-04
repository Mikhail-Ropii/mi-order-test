import { NavigationContainer } from "@react-navigation/native";
import { UseRoute } from "../routes/router";

export const Main = () => {
  const routing = UseRoute();
  return <NavigationContainer>{routing}</NavigationContainer>;
};
