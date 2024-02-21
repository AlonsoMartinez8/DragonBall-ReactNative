import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
} from "react-native";

export default function CharacterDetails({ route }) {
  const { item } = route.params;
  return (
    <View>
      <View style={styles.colCenter}>
        <Text style={styles.name}>{item.name}</Text>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
      <View style={styles.row}>
        <View>
          <Text style={styles.label}>Raza</Text>
          <Text style={styles.text}>{item.race}</Text>
        </View>
        <View>
          <Text style={styles.label}>Genero</Text>
          <Text style={styles.text}>{item.gender}</Text>
        </View>
        <View>
          <Text style={styles.label}>Ki</Text>
          <Text style={styles.text}>{item.ki}</Text>
        </View>
      </View>
      <ScrollView>
        <Text style={styles.description}>{item.description}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  colCenter: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  colStart: {
    display: "flex",
    flexDirection: "column",
    alignItems: "start",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  name: {
    fontSize: 30,
  },
  image: {
    width: 200,
    height: 200,
  },
  label: {
    display: "flex",
    fontWeight: "700",
    fontSize: 15,
    textAlign: "center",
  },
  text: {
    borderTopWidth: 1,
    borderTopColor: "#fff4",
    textAlign: "center",
  },
  description: {
    padding: 10,
  },
});
