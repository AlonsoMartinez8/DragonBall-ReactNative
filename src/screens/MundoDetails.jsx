import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ImageBackground,
  ScrollView,
} from "react-native";

export default function CharacterDetails({ route }) {
  const { item } = route.params;
  const mundoDestruido = (destruido) => {
    if (destruido) {
      return "Destruido";
    } else {
      return "Sin destruir";
    }
  };

  return (
    <ImageBackground source={{ uri: item.image }} style={styles.container}>
      <ScrollView style={styles.scrollview}>
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
          <View style={styles.colStart}>
            <Text style={styles.label}>Personajes</Text>
            <Text style={styles.text}>{item.gender}</Text>
          </View>
        </View>
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
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
  scrollview: {
    height: "100%",
    paddingHorizontal: 20,
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
