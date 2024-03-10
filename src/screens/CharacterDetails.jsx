import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
  Button,
} from "react-native";
import { ReadFav, addFav, RemoveFav } from "../services/dragonBallAPI";

export default function CharacterDetails({ route }) {
  const { item } = route.params;
  const [isFavorito, setIsFavorito] = useState(false);
  const [btnTitle, setBtnTitle] = useState("");
  const [personajesfav, setPersonajesFav] = useState([]);

  // obtener la lista de personajes favoritos para comprobar si un personaje esta en ella
  const getPersonajesFav = () => {
    ReadFav()
      .then((json) => {
        setPersonajesFav(json);
      })
      .catch((error) => console.log(error));
  };

  // comprobar si un personaje es favorito a la hora de cargar el detalle
  const checkIsFavorito = (id) => {
    const favorito = personajesfav.find((fav) => fav.id === id);
    return favorito !== undefined;
  };

  // al pulsar el boton, cambiarlo de favorito a no favorito o viceversa
  const handleBtnTitle = () => {
    if (checkIsFavorito(item.id)) {
      setBtnTitle("Eliminar de favoritos");
    } else {
      setBtnTitle("Añadir a favoritos");
    }
  };

  // añadir o eliminar un personaje de la lista de favoritos
  const handleFav = () => {
    if (!checkIsFavorito(item.id)) {
      addFav(item);
    } else {
      RemoveFav(item.id)
    }
  };

  useEffect(() => {
    getPersonajesFav();
    handleBtnTitle();
  }, [route.params, personajesfav]);

  return (
    // Imagen de fondo de la pantalla
    <ImageBackground
      source={require("../../assets/img/bg.png")}
      style={styles.container}
    >
      {/* Botón para añadir o eliminar de favoritos */}
      <Button title={btnTitle} onPress={handleFav}></Button>
      {/* Contenedor Scrollview para poder ver todos los detalles del personaje */}
      <ScrollView style={styles.scrollview}>
        {/* Columna con la imagen y el nombre del personaje */}
        <View style={styles.colCenter}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
        
        {/* Columna con los detalles del personaje */}
        <View style={styles.colStart}>
          <View style={styles.colStart}>
            <Text style={styles.label}>Raza</Text>
            <Text style={styles.text}>{item.race}</Text>
          </View>
          <View style={styles.colStart}>
            <Text style={styles.label}>Genero</Text>
            <Text style={styles.text}>{item.gender}</Text>
          </View>
          <View style={styles.colStart}>
            <Text style={styles.label}>Ki</Text>
            <Text style={styles.text}>{item.ki}</Text>
          </View>
        </View>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
  },
  colCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: 10,
  },
  colStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 50,
    padding: 20,
  },
  name: {
    fontSize: 30,
    color: "#fff",
    fontWeight: "800",
    borderWidth: 1,
    borderColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: "#1113",
  },
  image: {
    width: 300,
    height: 300,
  },
  label: {
    display: "flex",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
    marginTop: 10,
    backgroundColor: "#ddd",
  },
  text: {
    textAlign: "center",
    backgroundColor: "#1115",
    padding: 5,
    color: "#fff",
  },
  scrollview: {
    height: "100%",
    paddingHorizontal: 20,
  },
  description: {
    lineHeight: 20,
    textAlign: "center",
    backgroundColor: "#1115",
    color: "#fff",
    padding: 10,
    marginVertical: 10,
    marginBottom: 20,
  },
});
