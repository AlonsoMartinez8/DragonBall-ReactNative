import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text, View } from "react-native";
import MyMenu from "./src/navigation/MyMenu";
import { useState } from "react";

export default function App() {
  return (
    // Contenedor de navegación
    <NavigationContainer>
      <Text style={styles.header}>DRAGON BALL</Text>
      {/* Menú de aplicacion que va cambiando de pantalla */}
      <MyMenu />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  header:{
    padding: 10,
    paddingTop: 50,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '800',
    backgroundColor: "#000",
    color: "#da3"
  }
});
