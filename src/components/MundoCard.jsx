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
    width: '90%',
    height: 400,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15, // Adjust the border radius as needed
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 36,
    color: 'white',
    fontWeight: 'bold',
  },
});