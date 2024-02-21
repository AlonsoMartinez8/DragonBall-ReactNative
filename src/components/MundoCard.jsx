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
    width: windowWidth - 40,
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