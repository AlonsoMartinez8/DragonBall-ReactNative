import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import MyMenu from "./src/navigation/MyMenu";

export default function App() {

  return (
    <NavigationContainer>
      <MyMenu/>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({});
