import { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
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

  // obtener los personajes desde la API
  const getPersonajes = (page = 1) => {
    getCharactersByPage(page)
      .then((json) => {
        setPersonajes((previos) => [...previos, ...json.items]);
        setPaginasTotales(json.meta.totalPages);
        setPaginaActual(json.meta.currentPage);
      })
      .catch((error) => console.log(error));
  };

  // filtro de personajes por nombre
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  // gestionar los personajes que se ven en la interfaz por la búsqueda
  const managePersonajesBySearch = () => {
    if (search !== "") {
      let buscados = personajes.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedPersonajes(buscados);
    } else {
      setSearchedPersonajes(personajes);
    }
  };

  // hook para obtener los personajes y que se actualicen al buscar
  useEffect(() => {
    managePersonajesBySearch();
  }, [search, personajes]);

  // hook para obtener los personajes y que se actualicen
  useEffect(() => {
    getPersonajes(paginaActual);
  }, [paginaActual]);

  return (
    // Imagen de fondo de la pantalla
    <ImageBackground
      source={require("../../assets/img/background.jpg")}
      style={styles.list}
    >
      {/* Barra de búsqueda */}
      <MySearchBar onSearchChange={handleSearch} />
        
      {/* Lista de personajes */}
      <FlatList
        numColumns={2}
        data={searchedPersonajes}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // por cada personaje, mostrar su tarjeta
          <TouchableOpacity
            // al pulsar, navegar a la pantalla de detalles con el personaje
            onPress={() => navigation.navigate("Detalle", { item: item })}
          >
            <CharacterCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0}
        onEndReached={() => {
          // si no se ha llegado al final de la lista, cargar más personajes
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
