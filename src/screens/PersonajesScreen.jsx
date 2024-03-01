import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
} from "react-native";
import { getCharactersByPage } from "../services/dragonBallAPI";
import CharacterCard from "../components/CharacterCard";
import { useNavigation } from "@react-navigation/native";
import MySearchBar from "../components/MySearchBar";

export default function PersonajesScreen() {
  const [personajes, setPersonajes] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginasTotales, setPaginasTotales] = useState(0);
  const [search, setSearch] = useState("");
  const [searchedPersonajes, setSearchedPersonajes] = useState([]);

  const navigation = useNavigation();

  const getPersonajes = (page = 1) => {
    getCharactersByPage(page)
      .then((json) => {
        setPersonajes((previos) => [...previos, ...json.items]);
        setPaginasTotales(json.meta.totalPages);
        setPaginaActual(json.meta.currentPage);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  const managePersonajesBySearch = () => {
    if (search !== '') {
      let buscados = personajes.filter(
        (p) => p.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedPersonajes(buscados);
    } else {
      setSearchedPersonajes(personajes);
    }
  };

  useEffect(() => { 
    managePersonajesBySearch();
  }, [search, personajes]);

  useEffect(() => {
    getPersonajes(paginaActual);
  }, [paginaActual]);

  return (
    <ImageBackground
      source={require("../../assets/img/background.jpg")}
      style={styles.list}
    >
      <MySearchBar onSearchChange={handleSearch} />
      <FlatList
        numColumns={2}
        data={searchedPersonajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalle", { item: item })}
          >
            <CharacterCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0.1}
        onEndReached={() => {
          if (paginaActual < paginasTotales) {
            setPaginaActual((prev) => prev + 1);
          }
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    height: '100%',
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffaa33",
  },
});
