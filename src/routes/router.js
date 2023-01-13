import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { CatalogScreen } from "../screens/CatalogScreen";
import { OrderScreen } from "../screens/OrderScreen";
import { AllOrdersScreen } from "../screens/AllOrdersScreen";
import { SettingsScreen } from "../screens/SettingsScreen";

const MainTab = createBottomTabNavigator();

export const UseRoute = () => {
  const tabBarLabelStyle = {
    fontFamily: "roboto.medium",
    fontSize: 17,
    lineHeight: 22,

    textAlign: "center",
    letterSpacing: -0.408,
  };

  return (
    <MainTab.Navigator
      initialRouteName="Catalog"
      screenOptions={{
        tabBarLabelStyle: tabBarLabelStyle,
        tabBarShowLabel: true,
        tabBarStyle: {
          height: 71,
          paddingHorizontal: 62,
          backgroundColor: "#e7f4f6",
        },
      }}
    >
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => null,
          title: "Каталог",
          headerShown: false,
        }}
        name="Catalog"
        component={CatalogScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => null,
          title: "Замовлення",
          headerShown: false,
        }}
        name="Order"
        component={OrderScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => null,
          title: "Журнал",
          unmountOnBlur: true,
          headerShown: false,
        }}
        name="AllOrders"
        component={AllOrdersScreen}
      />
      <MainTab.Screen
        options={{
          tabBarIcon: ({ focused, color, size }) => null,
          title: "Налаштування",
          headerShown: false,
        }}
        name="Settings"
        component={SettingsScreen}
      />
    </MainTab.Navigator>
  );
};
