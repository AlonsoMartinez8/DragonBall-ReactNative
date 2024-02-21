import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

export default function MundoCard({ item }) {
  return (
    <View style={styles.row}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
      <View style={[styles.column, { marginLeft: 10 }]}>
        <Text style={[styles.text, { fontWeight: "bold" }]}>{item.name}</Text>
        <Text style={styles.text}>{item.description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: 80,
    height: 80
  },
  row: {
    flex: 1,
    flexDirection: "row",
    margin: 10
  },
  column: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  text: {
    fontSize: 18
  }
});