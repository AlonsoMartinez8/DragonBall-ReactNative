import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackCharacter from "../navigation/StackCharacter";
import StackMundo from "../navigation/StackMundo";
import FavoritosScreen from "../screens/FavoritosScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function MyMenu() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerStyle:{backgroundColor: "#000"},
        headerTintColor: "#ff9711",
        tabBarActiveTintColor: "#ff9711",
        tabBarActiveBackgroundColor: "#111",
        tabBarInactiveBackgroundColor: "#000",
      }}
    >
      <Tab.Screen
        name="Personajes"
        component={StackCharacter}
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
        component={StackMundo}
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
