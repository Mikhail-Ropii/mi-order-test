import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CatalogScreen } from "../screens/CatalogScreen";
import { OrderScreen } from "../screens/OrderScreen";
import { AllOrdersScreen } from "../screens/AllOrdersScreen";

const MainTab = createBottomTabNavigator();

export const UseRoute = () => {
  // const headerTitleStyle = {
  //   fontFamily: "Roboto-Medium",
  //   fontSize: 17,
  //   lineHeight: 22,

  //   textAlign: "center",
  //   letterSpacing: -0.408,

  //   color: "#212121",
  // };

  return (
    <MainTab.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarStyle: { height: 71, paddingHorizontal: 62 },
      }}
    >
      <MainTab.Screen
        options={{
          headerShown: false,
        }}
        name="Catalog"
        component={CatalogScreen}
      />
      <MainTab.Screen
        options={{
          headerShown: false,
          headerRight: () => (
            <FontAwesome
              onPress={openModalForSave}
              name="save"
              size={24}
              color="black"
            />
          ),
        }}
        name="Order"
        component={OrderScreen}
      />
      <MainTab.Screen
        options={{
          unmountOnBlur: true,
          headerShown: false,
        }}
        name="AllOrders"
        component={AllOrdersScreen}
      />
    </MainTab.Navigator>
  );
};
