import React from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'

export default function CharacterDetails({ route }) {
  const { item } = route.params;
  return (
    <View style={styles.column}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={[styles.column, { marginLeft: 10 }]}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>{item.name}</Text>
        <Text style={styles.text}>{item.name}</Text>
        <Text style={styles.text}>{item.ki}</Text>
        <Text style={styles.text}>{item.race}</Text>
        <Text style={styles.text}>{item.affiliation}</Text>

      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    margin: 20
  },
  text: {
    fontSize: 18
  }
});