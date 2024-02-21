import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import PersonajesScreen from "../screens/PersonajesScreen";
import MundosScreen from "../screens/MundosScreen";
import FavoritosScreen from "../screens/FavoritosScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function MyMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "#ff9711",
        tabBarActiveBackgroundColor: "#000",
      }}
    >
      <Tab.Screen
        name="Personajes"
        component={PersonajesScreen}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Mundos"
        component={MundosScreen}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name="earth"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
      <Tab.Screen
        name="Favoritos"
        component={FavoritosScreen}
        options={{
          tabBarIcon: ({ size, color }) => {
            return (
              <MaterialCommunityIcons
                name="progress-star"
                size={size}
                color={color}
              />
            );
          },
        }}
      />
    </Tab.Navigator>
  );
}
