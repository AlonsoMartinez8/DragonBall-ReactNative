import { Image, Text, View } from "react-native";


export default function CharacterCard({item}) {
  return (
    <View>
        <Text>{item.name}</Text>
    </View>
  )
}
