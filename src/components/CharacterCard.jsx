import { Image, StyleSheet, Text, View } from "react-native";

export default function CharacterCard({ item }) {
  return (
    <View style={styles.card}>
      <Image
        source={{ uri: item.image }}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.overlay}>
        <Text style={styles.name}>{item.name}</Text>
      </View>
      
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
    margin: 10,
    width: 180,
    height: 200,
    borderWidth: 1,
    borderColor: "#fff",
    borderRadius: 10,
    overflow: 'hidden',
  },
  image: {
    position: 'absolute',
    top: 0,
    width: 300,
    height: 300,
  },
  overlay:{
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    backgroundColor: '#1113',
    borderRadius: 10,
  },
  name: {
    width: '100%',
    fontSize: 20,
    fontWeight: "700",
    color: "#fff",
    textAlign: "center",
    backgroundColor:"#1116",
    padding: 10,
  },
});
