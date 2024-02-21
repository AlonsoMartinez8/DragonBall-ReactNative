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
        borderColor: '#fff',
        backgroundColor: "#ddd3",
        borderRadius: 10,
    },
    image: {
        width: 300,
      height: 300,
    },
    name: {
        fontSize: 20,
        fontWeight: '700',
        color: "#fff",
        marginTop: 10,
    }
  });
