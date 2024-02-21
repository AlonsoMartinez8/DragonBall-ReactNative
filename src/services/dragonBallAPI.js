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