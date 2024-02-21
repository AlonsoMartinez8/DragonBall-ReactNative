import React from 'react'
import { StyleSheet, View, Image, Text } from 'react-native'

export default function MundoCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
        <Text style={[styles.name]}>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  card:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'start',
    margin: 10,
    borderWidth: 1,
    borderColor: '#fff',
    backgroundColor: "#ddd3",
    borderRadius: 10,
},
image: {
    width: 300,
    height: 300,
    borderRadius: 10,
},
name: {
    fontSize: 20,
    fontWeight: '700',
    color: "#fff",
    padding: 10,
}
});