import {
  ImageBackground,
  StyleSheet,
  FlatList,
  Text,
  TouchableOpacity,
} from "react-native";
import React, { useState, useEffect, useCallback } from "react";
import { ReadFav, RemoveFav } from "../services/dragonBallAPI";
import CharacterCard from "../components/CharacterCard";

export default function FavoritosScreen({ route }) {
  const [personajesfav, setPersonajesFav] = useState([]);

  const getPersonajesFav = () => {
    ReadFav()
      .then((json) => {
        setPersonajesFav(json);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPersonajesFav();
  }, [route.params]);

  return (
    <ImageBackground
      source={require("../../assets/img/favoritos.jpg")}
      style={styles.list}
    >
      <FlatList
        numColumns={2}
        data={personajesfav}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              RemoveFav(item.id);
              const updatedPersonajesFav = personajesfav.filter(
                (p) => p.id !== item.id
              );
              setPersonajesFav(updatedPersonajesFav);
            }}
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
    height: "100%",
  },
});
