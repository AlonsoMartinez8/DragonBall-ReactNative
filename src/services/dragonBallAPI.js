const API = "https://dragonball-api.com/api/";
export async function getCharactersByPage(page = 1) {
  const data = await fetch(`${API}characters?page=${page}`);
  const json = await data.json();
  return json;
}

export async function getPlanetsByPage(page) {
  const data = await fetch(`${API}planets?page=${page}`);
  const json = await data.json();
  return json;
}

export async function getPlanetById(id) {
  const data = await fetch(`${API}planets/${id}`)
  const json = await data.json();
  return json;
}


// ------------------------ Leer desde JSON local ---------------------- \\

import { RNFS } from 'react-native-fs';
const filePath= RNFS.DocumentDirectoryPath + "favJson.json"

let personajesfav = [];
export async function addFav(item) {
  personajesfav = await ReadFav();
  await AddFavToJson();
  await WriteFav();
}
export async function ReadFav() { // devuelve un array de personajes favoritos (obtenido desde json)
  try {
    const data = await RNFS.readFile(filePath, 'utf-8');
    const json = JSON.parse(data);
    return json.personajesfav;
  } catch (error) {
    console.error('Error reading planets data:', error);
    return [];
  }
}
export async function AddFavToJson() { // añade un objecto al array
  personajesfav.push(item);
}
export async function WriteFav() { // escribe el nuevo array al archivo json
  try {
    const jsonData = JSON.stringify({
      personajesfav: personajesfav,
      planetas: []
    });
    await RNFS.writeFile(filePath, jsonData, 'utf-8');
    console.log("hecho");
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

