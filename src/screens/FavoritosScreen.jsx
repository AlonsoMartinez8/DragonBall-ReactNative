import { ImageBackground, Text, View, StyleSheet } from "react-native";
const [personajesfav, setPersonajesFav] = useState([]);
export default function FavoritosScreen() {
  const getPersonajesFav = () => {
    ReadFav()
      .then((json) => {
        setPersonajesFav((previos) => [...previos, ...json.items]);
      })
      .catch((error) => console.log(error));
  };

  useEffect(() => {
    getPersonajesFav();
    console.log(personajesfav);
  }, []);
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
