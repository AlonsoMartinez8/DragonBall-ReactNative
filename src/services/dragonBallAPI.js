const API = "https://dragonball-api.com/api/";

export async function getCharactersByPage(page = 1) {
  const data = await fetch(`${API}characters?page=${page}`);
  const json = await data.json();
  return json;
}

export async function getPlanetsByPage(page) {
  let pageStr = ""
  if(page === 1) {
    pageStr = ""
  } else {
    pageStr = "?page=2&limit=10"
  }
  const data = await fetch(`${API}planets${pageStr}`);
  const json = await data.json();
  return json;
}