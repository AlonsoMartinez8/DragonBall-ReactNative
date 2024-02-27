import { ImageBackground, Text, View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";
import { ReadFav } from "../services/dragonBallAPI";

export default function FavoritosScreen() {
  const [personajesfav, setPersonajesFav] = useState([]);
  const getPersonajesFav = () => {
    ReadFav()
      .then((json) => {
        setPersonajesFav((previos) => [...previos, ...json]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPersonajesFav();
    console.log(personajesfav.forEach((element) => console.log(element)));
  }, []);
  return (
    <View>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/img/favoritos.jpg")}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
});
