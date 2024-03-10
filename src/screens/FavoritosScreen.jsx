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

  // obtener los personajes favoritos desde un archivo json local
  const getPersonajesFav = () => {
    ReadFav()
      .then((json) => {
        setPersonajesFav(json);
      })
      .catch((error) => console.log(error));
  };

  // hook para obtener los personajes favoritos y que se actualicen
  useEffect(() => {
    getPersonajesFav();
  }, [route.params]);

  return (
    /* Imagen de fondo */
    <ImageBackground
      source={require("../../assets/img/favoritos.jpg")}
      style={styles.list}
    >
      {/* Lista de elementos que depende del hook */}
      <FlatList
        numColumns={2}
        data={personajesfav}
        renderItem={({ item }) => (
          // Botón para eliminar un personaje de la lista de favoritos
          <TouchableOpacity
            onPress={() => {
              // eliminar el personaje de la lista de favoritos del json local
              RemoveFav(item.id);
              const updatedPersonajesFav = personajesfav.filter(
                (p) => p.id !== item.id
              );
              // al pulsar sobre un personaje favorito, se actualizar la interfaz con la nueva lista
              setPersonajesFav(updatedPersonajesFav);
            }}
          >
            {/* Card de personaje -> Es un componente */}
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
