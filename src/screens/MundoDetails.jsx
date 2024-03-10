import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
  Image,
} from "react-native";
import { getPlanetById } from "../services/dragonBallAPI";

export default function MundoDetails({ route }) {
  const [personajes, setPersonajes] = useState([]);
  const { item } = route.params;

  // segun el booleano, mostrar si el mundo esta destruido o no
  const mundoDestruido = (destruido) =>
    destruido ? "Destruido" : "Sin destruir";

  // obtener los personajes del mundo desde la api de forma asíncrona
  useEffect(() => {
    const fetchData = async () => {
      try {
        const planet = await getPlanetById(item.id);
        const nuevosPersonajes = planet.characters.map((c) => c.image);
        setPersonajes((prevPersonajes) => [
          ...prevPersonajes,
          ...nuevosPersonajes,
        ]);
      } catch (error) {
        console.error("Error al obtener los personajes:", error);
      }
    };

    fetchData();
  }, []);

  return (
    // Imagen de fondo de la pantalla
    <ImageBackground source={{ uri: item.image }}>
      <View style={styles.container}>
        {/* Nombre del mundo */}
        <View style={styles.colCenter}>
          <Text style={styles.name}>{item.name}</Text>
        </View>


        {/* Resto de detalles del mundo */}
        <View style={styles.colStart}>
          <View style={styles.colStart}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
          <View style={styles.colStart}>
            <Text style={styles.label}>Destruido</Text>
            {/* Según el booleano, mostrar si el mundo está destruido o no */}
            <Text style={styles.text}>{mundoDestruido(item.isDestroyed)}</Text>
          </View>
        </View>


        {/* Personajes del mundo */}
        <View style={styles.colStart}>
          <Text style={styles.label}>Personajes</Text>
          <FlatList
            style={styles.list}
            numColumns={4}
            data={personajes}
            renderItem={({ item: personaje }) => (
              // por cada personaje, mostrar su imagen
              <View style={styles.imagecontainer}>
                <Image style={styles.image} source={{ uri: personaje }} />
              </View>
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    height: "100%",
    padding: 20,
  },
  colCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: 20,
  },
  colStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
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
    backgroundColor: "#1119",
    padding: 5,
    color: "#fff",
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
    textAlign: 'center',
    marginTop: 10,
  },
  imagecontainer:{
    backgroundColor: "#0005",
    width: "25%",
    height: 120,
    padding: 5,
  },
  image: {
    objectFit: "contain",
    width: "100%",
    height: "100%",
  },
});
