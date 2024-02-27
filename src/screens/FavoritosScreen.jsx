import { ImageBackground, Text, View, StyleSheet, FlatList, TouchableOpacity } from "react-native";
import React, { useState, useEffect } from "react";
import { ReadFav } from "../services/dragonBallAPI";
import CharacterCard from "../components/CharacterCard";

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
    console.log("personajes: " + personajesfav.forEach((element) => console.log(element)));
  }, []);
  return (
    <ImageBackground source={require("../../assets/img/favoritos.jpg")} style={styles.list}>
      <FlatList
        numColumns={2}
        data={personajesfav}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => console.log("personaje click")}
          >
            <CharacterCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffaa33",
    height: '100%',
  },
});

