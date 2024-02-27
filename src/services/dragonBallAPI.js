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

import * as FileSystem from 'expo-file-system';

const initializeFile = async () => {
  const filePath = `${FileSystem.documentDirectory}favJson.json`;

  // Check if the file exists
  const fileInfo = await FileSystem.getInfoAsync(filePath);

  if (!fileInfo.exists) {
    // Create the file with default content
    const defaultData = { personajesfav: [], planetas: [] };
    const jsonData = JSON.stringify(defaultData, null, 2);

    await FileSystem.writeAsStringAsync(filePath, jsonData, { encoding: FileSystem.EncodingType.UTF8 });
    console.log("File initialized successfully");
  }
};

// Call the initialization function
initializeFile();

// Path to the file in document directory
const filePath = `${FileSystem.documentDirectory}favJson.json`;
export async function addFav(item) {
  let personajesfav = await ReadFav();
  await AddFavToJson(personajesfav, item);
  await WriteFav(personajesfav);
}
export async function ReadFav() { // devuelve un array de personajes favoritos (obtenido desde json)
  try {
    const data = await FileSystem.readAsStringAsync(filePath, { encoding: FileSystem.EncodingType.UTF8 });
    const json = JSON.parse(data);
    return json.personajesfav;
  } catch (error) {
    console.error('Error reading fav data:', error);
    return [];
  }
}
export async function AddFavToJson(personajesfav, item) { // agrega un nuevo personaje al array
  personajesfav.push(item);
  console.log("pushing" + item);
}
export async function WriteFav(personajesfav) { // escribe el nuevo array al archivo json
  try {
    const data = {
      "personajesfav": personajesfav,
      "planetas": []
    };
    const jsonData = JSON.stringify(data, null, 2);
    await FileSystem.writeAsStringAsync(filePath, jsonData, { encoding: FileSystem.EncodingType.UTF8 });
    console.log("hecho");
  } catch (error) {
    console.error('Error writing data:', error);
  }
}

