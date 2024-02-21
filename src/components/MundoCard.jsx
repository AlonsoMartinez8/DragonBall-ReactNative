import React from 'react'
import { StyleSheet, View, Image, Text, Dimensions } from 'react-native'

let windowWidth = Dimensions.get('window').width;

export default function MundoCard({ item }) {
  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="cover" />
      <View style={styles.overlay}>
        <Text style={styles.text}>{item.name}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: windowWidth - 20,
    height: 300,
    marginHorizontal: 10,
    marginVertical: 10,
    borderRadius: 15, // Adjust the border radius as needed
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    // set width and height to null or undefined to override the fixed size
    width: null,
    height: null,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
},
  text: {
    color: 'white',
    fontSize: 36,
    fontWeight: 'bold',
    textAlign: 'center',
  }
});