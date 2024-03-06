import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'

let windowWidth = Dimensions.get('window').width;

export default function MundoCard({ item }) {
  return (
    /* MundoCard -> Es un componente */
    <View style={styles.card}>
      {/* Imagen del mundo */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      {/* Nombre del mundo */}
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: windowWidth/2-20,
    height: windowWidth/2-20,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#fff',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#1113",
    borderRadius: 10,
},
name: {
    fontSize: 20,
    fontWeight: '700',
    color: "#fff",
    padding: 10,
    textAlign: 'center',
}
});