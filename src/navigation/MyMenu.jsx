import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import StackCharacter from "../navigation/StackCharacter";
import StackMundo from "../navigation/StackMundo";
import FavoritosScreen from "../screens/FavoritosScreen";
import { MaterialCommunityIcons } from "@expo/vector-icons";
const Tab = createBottomTabNavigator();

export default function MyMenu() {

  return (
    // Navegador de pestañas con las pantallas de personajes, mundos y favoritos
    // Cada pantalla tiene su propio stack de navegación
    <Tab.Navigator
      screenOptions={{
        headerStyle:{backgroundColor: "#000", borderTopColor: '#fff4', borderTopWidth: 1,},
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
        initialParams={{ reRender: true }}
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
