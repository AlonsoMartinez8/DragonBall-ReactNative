import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import PersonajesScreen from "./PersonajesScreen"
import MundosScreen from "./MundosScreen"
import FavoritosScreen from "./FavoritosScreen"
const Tab = createBottomTabNavigator()

export default function MyMenu() {
  return (
    <Tab.Navigator>
        <Tab.Screen name="Personajes" component={PersonajesScreen}/>
        <Tab.Screen name="Mundos" component={MundosScreen}/>
        <Tab.Screen name="Favoritos" component={FavoritosScreen}/>
    </Tab.Navigator>
  )
}
