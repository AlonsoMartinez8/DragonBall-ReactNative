import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  FlatList,
} from "react-native";

export default function MundoDetails({ route }) {
  const { item } = route.params;
  const mundoDestruido = (destruido) =>
    destruido ? "Destruido" : "Sin destruir";
  const personajes = [
    {
      id: 0,
      nombre: "Goku",
    },
    {
      id: 1,
      nombre: "Vegeta",
    },
    {
      id: 2,
      nombre: "Gohan",
    },
  ];

  return (
    <ImageBackground source={{ uri: item.image }}>
      <View style={styles.container}>
        <View style={styles.colCenter}>
          <Text style={styles.name}>{item.name}</Text>
        </View>
        <View style={styles.colStart}>
          <View style={styles.colStart}>
            <Text style={styles.label}>Descripción</Text>
            <Text style={styles.text}>{item.description}</Text>
          </View>
          <View style={styles.colStart}>
            <Text style={styles.label}>Destruido</Text>
            <Text style={styles.text}>{mundoDestruido(item.isDestroyed)}</Text>
          </View>
        </View>
        <View style={styles.colStart}>
          <Text style={styles.label}>Personajes</Text>
          <FlatList
          style={styles.list}
          numColumns={4}
            data={personajes}
            renderItem={({ item: personaje }) => (
              <Text style={styles.text}>
                {personaje.nombre}
              </Text>
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
    marginTop: 10,
  },
});
