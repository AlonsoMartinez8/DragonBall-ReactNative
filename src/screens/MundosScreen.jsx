import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
  Dimensions,
} from "react-native";
import { getPlanetsByPage } from "../services/dragonBallAPI";
import MundoCard from "../components/MundoCard";
import MySearchBar from "../components/MySearchBar";

export default function MundosScreen() {
  const [mundos, setMundos] = useState([]);
  const [paginaActual, setPaginaActual] = useState(1);
  const [paginasTotales, setPaginasTotales] = useState(0);
  const [search, setSearch] = useState("");
  const [searchedMundos, setSearchedMundos] = useState([]);

  const navigation = useNavigation();

  // obtener los mundos de la API
  const getMundos = (page = 1) => {
    getPlanetsByPage(page)
      .then((json) => {
        setMundos((previos) => [...previos, ...json.items]);
        setPaginasTotales(json.meta.totalPages);
        setPaginaActual(json.meta.currentPage);
      })
      .catch((error) => console.log(error));
  };

  // filtro de mundos por nombre
  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

  // gestionar los mundos que se ven en la interfaz por la búsqueda
  const manageMundosBySearch = () => {
    if (search !== "") {
      let buscados = mundos.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
      setSearchedMundos(buscados);
    } else {
      setSearchedMundos(mundos);
    }
  };

  // hook para obtener los mundos y que se actualicen al buscar
  useEffect(() => {
    manageMundosBySearch();
  }, [search, mundos]);

  // hook para obtener los mundos y que se actualicen
  useEffect(() => {
    getMundos(paginaActual);
  }, [paginaActual]);

  return (
    // Imagen de fondo
    <ImageBackground
      source={require("../../assets/img/background.jpg")}
      style={styles.list}
    >
      {/* Barra de búsqueda -> Es un componente */}
      <MySearchBar onSearchChange={handleSearch} />
      {/* Lista de mundos que depende del hook */}
      <FlatList
        numColumns={2}
        data={searchedMundos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          // Botón para ver el detalle de un mundo
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalle", { item: item })}
          >
            {/* Card de mundo -> Es un componente */}
            <MundoCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0}
        onEndReached={() => {
          {/* Al llegar al final de la lista, cargar más mundos */}
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
