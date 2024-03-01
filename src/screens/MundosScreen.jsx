import { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
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

  const getMundos = (page = 1) => {
    getPlanetsByPage(page)
      .then((json) => {
        setMundos((previos) => [...previos, ...json.items]);
        setPaginasTotales(json.meta.totalPages);
        setPaginaActual(json.meta.currentPage);
      })
      .catch((error) => console.log(error));
  };

  const handleSearch = (searchValue) => {
    setSearch(searchValue);
  };

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

  useEffect(() => {
    manageMundosBySearch();
  }, [search, mundos]);

  useEffect(() => {
    getMundos(paginaActual);
  }, [paginaActual]);

  return (
    <ImageBackground
      source={require("../../assets/img/background.jpg")}
      style={styles.list}
    >
      <MySearchBar onSearchChange={handleSearch} />
      <FlatList
        numColumns={2}
        data={searchedMundos}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate("Detalle", { item: item })}
          >
            <MundoCard key={item.id} item={item} />
          </TouchableOpacity>
        )}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (paginaActual < paginasTotales) {
            getMundos(paginaActual + 1);
            setPaginaActual(paginaActual + 1);
          }
        }}
      />
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  list: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#ffaa33",
  },
});
