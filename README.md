# Dragon Ball - React Native

App de personajes de DragonBall con ReactNative y Expo usando la [dragonball-api](https://web.dragonball-api.com/).

![logo dragonball api](https://web.dragonball-api.com/images-compress/logo_dragonballapi.webp)

## Indice

1. Introducción
  
2. Requisitos
  
3. Diseño
  
4. Estructura
  
5. Api
  
6. Componentes
  
7. Navigation
  

# Introducción

Aplicación móvil multiplataforma basada en [React Native](https://reactnative.dev/). Hemos usado Expo como plataforma para hacer pruebas y hacer el despliegue final.

### Nuestra aplicación

Este proyecto en concreto consiste en una aplicación que sirve para tener una herramienta sencilla donde podamos visualizar los diferentes personajes que aparecen a lo largo de las distintas series y películas de [Dragon Ball](https://es.dragon-ball-official.com/), además de los planetas o mundos de donde provienen.

# Requisitos

Durante el proceso de desarrollo nos han ido surgiendo diferentes necesidades como un menú de navegación, descarga de datos por internet, etc. Para solucionar cada uno de estos problemas hemos ido añadiendo diferentes dependencias.

### Configurando el entorno de desarrollo

Antes de empezar a programar, hemos tenido que instalar estos programas:

- [git](https://git-scm.com/) + [github](https://github.com/)
  
- [visual studio code](https://code.visualstudio.com/)
  
- [android studio](https://developer.android.com/studio?hl=es-419)
  
- [node](https://nodejs.org/en)
  
- [npm](https://www.npmjs.com/)
  
- [expo go](https://expo.dev/client)
  

### React

Una vez descargadas todas esas herramientas, creamos nuestra aplicación con

```bash
npx create-expo-app <nombre_proyecto>
```

Después, instalamos las **dependencias** que necesitamos con `npm install <dependencia>` En concreto instalamos las siguientes

```json
"dependencies": {
    "@react-navigation/bottom-tabs": "^6.5.12",
    "@react-navigation/native": "^6.1.10",
    "@react-navigation/native-stack": "^6.9.18",
    "expo": "~50.0.7",
    "expo-status-bar": "~1.11.1",
    "react": "18.2.0",
    "react-native": "0.73.4",
    "react-native-safe-area-context": "^4.9.0",
    "react-native-screens": "^3.29.0",
    "expo-file-system": "~16.0.7"
  },
```

# Diseño

Para hacer la [maqueta](https://www.figma.com/file/dxLDzpacBvhNlkpytHxjTI/Untitled?type=design&node-id=0-1&mode=design&t=HQYX01ZXdfsOOHGG-0) de nuestra aplicacion hemos usado [figma](https://www.figma.com)

No voy a detenerme mucho más en este apartado porque veremos el diseño de la aplicación más adelante con la funcionalidad ya implementada.

# Estructura

Para organizar nuestro programa utilizamos el enfoque "folder by type":

```bash
src
|-- components
|   |-- CharacterCard.jsx
|   |-- MundoCard.jsx
|   |-- MySearchBar.jsx
|-- navigation
|   |-- MyMenu.jsx
|   |-- StackCharacter.jsx
|   |-- StackMundo.jsx
|-- screens
|   |-- CharacterDetails.jsx
|   |-- FavoritosScreen.jsx
|   |-- MundoDetails.jsx
|   |-- MundosScreen.jsx
|   |-- PersonajesScreen.jsx
|-- services
|   |-- dragonBallAPI.js
|   |-- favJson.json
|-- App.js
```

Este sistema de archivos esta subido en nuestro [repositorio](https://github.com/AlonsoMartinez8/DragonBall-ReactNative)

# Api

Como indicamos antes, usamos la [dragonball-api](%5Bhttps://web.dragonball-api.com/%5D(https://web.dragonball-api.com/)) para acceder a los datos. Para ello creamos el archivo "dragonBallAPI.js", donde vamos a tener diferentes funciones asíncronas que van a descargar el resultado de llamadas a la api y transformar el contenido a json.

```js
const API = "https://dragonball-api.com/api/";
export async function getCharactersByPage(page = 1) {
  const data = await fetch(`${API}characters?page=${page}`);
  const json = await data.json();
  return json;
}

```

Luego accedemos a estas llamadas también de forma asíncrona para evitar que el hilo principal de la aplicación se quede parado:

```js
const getPersonajes = (page = 1) => {
    getCharactersByPage(page)
      .then((json) => {
        setPersonajes((previos) => [...previos, ...json.items]);
        setPaginasTotales(json.meta.totalPages);
        setPaginaActual(json.meta.currentPage);
      })
      .catch((error) => console.log(error));
  };
```

Cabe destacar que en nuestro caso tambien hay que tener en cuenta que el resultado json viene en varias páginas, por lo que lo almacenamos en hooks:

```js
const [paginaActual, setPaginaActual] = useState(1);
const [paginasTotales, setPaginasTotales] = useState(0);
```
# Componentes
A lo largo del desarrollo de la App hemos necesitado incorporar distintos tipos de componentes
 - Componentes de navegación y pantallas
 - Componentes propios para funcionalidades específicas
 
En éste apartado contemplaremos los **componentes propios**, ya que en el siguiente analizaremos específicamente los de navegación.
```bash
src
|-- components
|   |-- CharacterCard.jsx
|   |-- MundoCard.jsx
|   |-- MySearchBar.jsx
```
## Cards
Las Card o *Tarjetas* son diseñadas con el fin de mostrar una vista previa de los *items* mostrados en nuestras **FlatList** y poder ser seleccionadas por el usuario para ver su detalle.
Es una forma de mostrar información básica de manera minimalista.

> Los **items** son los elementos de una lista. En éste caso, nuestras Card, que mostrarán Personajes y Mundos de la saga de DragonBall.
> 
> Una **FlatList** es un componente nativo de ReacNative. Son listas dinámicas las cuales se componen de cada objeto de un array de objetos

### Character Card
En éste componente nos encontramos con la importación de los distintos componentes nativos de ReactNative utilizados y además, con dos variables: *windowWidth* y *windowHeight*.
```js
import { Dimensions, Image, StyleSheet, Text, View } from  "react-native";

let  windowWidth  =  Dimensions.get('window').width;
let  windowHeight  =  Dimensions.get('window').height;
```
Éstas variables serán utilizadas en el estilo del componente para fijarle una altura y anchura dependiente del tamaño de la pantalla del dispositivo.
```json
card: {
  width:  windowWidth/2-20,
  height:  windowHeight/4-20
}
```
En cuanto a la estructura del componente:
```jsx
return (
  <View  style={styles.card}>
	<Image
	  source={{ uri:  item.image }}
	  style={styles.image}
	  resizeMode="contain"
	/>
	<View  style={styles.overlay}>
	  <Text  style={styles.name}>{item.name}</Text>
	</View>
  </View>
);
```
Encontramos un componente **View** como contenedor principal encapsulando una **Image** y otro contenedor que alberga un texto.
El motivo por el que utilizamos un contenedor para la etiqueta **Text** es el estilado. 
Utilizaremos técnicas de **posicionamiento absoluto** para que la imagen ocupe todo el espacio y el contenedor del texto con el estilo *overlay* se posicione por encima.
El resultado sería :

![Character Card imagen](assets/docImg/CharacterCard.PNG?row=true)

En cuanto a la funcionalidad, es ínfima. Lo único que realiza éste componente es la visualización de los datos proporcionados en un objeto a través de sus *props*:
```jsx
export  default  function  CharacterCard({ item }) {}
```
En concreto, únicamente utiliza el *nombre* y la *imagen*.
### Character Card
Éste componente es casi exactamente igual al anterior. De hecho pensamos en unificar ambos en un único componente **Card** pero debido a la falta de tiempo lo posponemos para implementarlo en un futuro.

> Quisiéramos añadir que ustedes como comunidad también podéis aportar en el proyecto realizando una Pull Request.

El único comportamiento distinto a destacar es la utilización de una única variable
 ```js 
 let  windowWidth  =  Dimensions.get('window').width;
 ```
 debido a que decidimos que el aspecto de éste componente sería cuadrado y no rectangular.
 
![Character Card imagen](assets/docImg/MundoCard.PNG?row=true)
