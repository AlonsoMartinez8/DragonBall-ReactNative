import { Image, StyleSheet, Text, View } from "react-native";


export default function CharacterCard({item}) {
  return (
    <View style={styles.card}>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text style={styles.name}>{item.name}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    card:{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
        margin: 10,
        width: 300,
        borderWidth: 1,
        borderColor: '#4448',
        borderRadius: 10,
        backgroundColor: '#2224'
    },
    image: {
        width: 300,
      height: 300,
    },
    name: {
        fontSize: 30,
        fontWeight: '700',
    }
  });
