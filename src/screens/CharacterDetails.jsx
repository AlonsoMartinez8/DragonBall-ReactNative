import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from "react-native";

export default function CharacterDetails({ route }) {
  const { item } = route.params;
  return (
    <ImageBackground source={require("../../assets/img/bg.png")} style={styles.container}>
      <ScrollView style={styles.scrollview}>
        <View style={styles.colCenter}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
            resizeMode="contain"
          />
          <Text style={styles.name}>{item.name}</Text>
        </View>
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
  container:{
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
    color: '#fff',
    fontWeight: '800',
    borderWidth: 1,
    borderColor: '#fff',
    paddingVertical: 10,
    paddingHorizontal: 40, 
    backgroundColor: '#1113',
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
    backgroundColor: '#ddd',
  },
  text: {
    textAlign: "center",
    backgroundColor: '#1115',
    padding: 5,
    color: '#fff',
  },
  scrollview: {
    height: '100%',
    paddingHorizontal: 20,
  },
  description: {
    lineHeight: 20,
    textAlign: "center",
    backgroundColor: '#1115',
    color: '#fff',
    padding: 10,
    marginTop: 10
  },
});
