import { ImageBackground, Text, View, StyleSheet } from "react-native";

export default function FavoritosScreen() {
  return (
    <View>
      <ImageBackground
        style={styles.container}
        source={require("../../assets/img/favoritos.jpg")}
      ></ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
});
