const API = " https://www.dragonball-api.com/api/";

export async function getCharacters() {
  const data = await fetch(`${API}characters`);
  const json = await data.json();
  return json;
}