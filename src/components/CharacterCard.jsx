import { Image, StyleSheet, Text, View } from "react-native";


export default function CharacterCard({item}) {
  return (
    <View>
        <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
        <Text>{item.name}</Text>
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
