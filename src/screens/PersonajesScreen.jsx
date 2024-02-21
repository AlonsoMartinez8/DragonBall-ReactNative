import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { getCharactersByPage } from "../services/dragonBallAPI";
import CharacterCard from "../components/CharacterCard";
import { useNavigation } from "@react-navigation/native";

export default function PersonajesScreen() {
  const [personajes, setPersonajes] = useState([])
  const [paginaActual, setPaginaActual] = useState(1)
  const [paginasTotales, setPaginasTotales] = useState(0)
  const navigation = useNavigation();

  const getPersonajes = (page=1)=>{
    getCharactersByPage(page)
    .then(json=>{
      setPersonajes(previos=>[...previos, ...json.items])
      setPaginasTotales(json.meta.totalPages)
      setPaginaActual(json.meta.currentPage)
    })
    .catch(error=>console.log(error))
  }

  useEffect(() => {
    getPersonajes();
  }, []);

  return (
    <View style={styles.list}>
      <FlatList
        
        data={personajes}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('CharacterDetails', { item: item })}
          >
            <CharacterCard key={item.id} item={item}/>
          </TouchableOpacity>
          
        )}
        onEndReachedThreshold={0}
        onEndReached={() => {
          if (paginaActual < paginasTotales) {
            getPersonajes(paginaActual + 1);
            setPaginaActual(paginaActual + 1);
          }
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  list:{
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  }
})