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
 
![Mundo Card imagen](assets/docImg/MundoCard.PNG?row=true)

## SearchBar
El componente MySearchBar se pensó para implementar una funcionalidad de búsqueda de *items*  en nuestras listas.
Finalmente, no actúa como componente de **Búsqueda**, sino como componente de **Filtro**.

> Detallar que la funcionalidad completa de éste componente no está desarrollada intrínsecamente en él sino en otros componentes.
> Es a futuro la implementación de toda la funcionalidad en él para mejorar su reutilización.
> De nuevo damos paso a la comunidad para que pueda ayudar y aportar en el proyecto realizando peticiones de actualización (Pull Request)

### Funcionalidad propia
En primer lugar, utilizaremos un *hook* de estado para almacenar el estado de la búsqueda. Éste estado será la cadena buscada, inicializado como una cadena vacía.
```jsx
const [search, setSearch] =  useState("");
```
En segundo lugar, estructuramos el componente de la siguiente forma.
```jsx
return (
  <View  style={styles.container}>
	<TextInput
	  style={styles.searchbar}
	  placeholder="Search"
	  onChangeText={handleSearchChange}
	/>
  </View>
);
```
Se compone de un contenedor y dentro de éste, un *input* de texto con su estilo propio, su *placeholder* y un *prop* que contiene por defecto éste componente nativo de ReactNative el cual es **onChangeText**, el cual se ejecuta cada vez que el texto del input sufre un cambio.
Éste prop llama a nuestro método **handleSearchChange**:
```jsx
const  handleSearchChange  = (s) => {
  setSearch(s);
};
```
Ésta función recibe por parámetro el texto contenido en el input y lo aplica en el estado de la búsqueda, quiere decir: *cada vez que la entrada del input cambia, el estado recoge el nuevo contenido de texto*.

En tercer lugar, contamos con un *hook* **useEffect** que se encarga de realizar una función cada vez que el componente se renderiza.

> El componente se renderizará mínimo una vez y además siempre que se actualicen las dependencias del useEffect.

```jsx
export  default  function  MySearchBar({ onSearchChange }) {
...
  useEffect(() => {
	onSearchChange(search);
  }, [search]);
...
}
```
Lo que sucede es que al componente MySearchBar se le pasa una función *callback* como *prop* desde componente **padre**. Ésta función es **onSearchChange**.

La función onSearchChange **devolverá información** al componente padre de lo que se está tratando de buscar mediante un **parámetro**, al cual se le adjudica **el valor del estado** de la búsqueda.

Hemos utilizado el hook useEffect para que éste comportamiento se ejecute cada vez que el valor del estado de la búsqueda se actualice, ya que como **dependencias**, lo incluye.

> Ésta metodología se aplica para que la información de la búsqueda se le transmita al componente padre a tiempo real

### Funcionalidad de otros componentes
En otros componentes encontramos el resto de la funcionalidad, la cual se basa en filtrar los datos que se le otorgan a la *FlatList* en función de la búsqueda de nuestro componente MySearchBar.

Utilizaremos a modo de explicación el componente **PersonajesScreen**, el cual será desarrollado completamente en el próximo apartado.
```jsx
const [personajes, setPersonajes] =  useState([]);
const [search, setSearch] =  useState("");
const [searchedPersonajes, setSearchedPersonajes] =  useState([]);
```
Éstos son los hooks de estado relevantes para la explicación de la funcionalidad de búsqueda de este componente.

 - Los **personajes**: Todos los personajes.
 - La **búsqueda**: La cadena buscada (el nombre del personaje)
 - Los personajes **filtrados** por la búsqueda.

Además también tenemos un hook **useEffect** relevante:
```jsx
useEffect(() => {
  managePersonajesBySearch();
}, [search, personajes]);
```
Se encarga de llamar al método **managePersonajesBySearch** el cual explicaremos a continuación.

Pero primero cabe mostrar la estructura relevante del componente:
```jsx
<MySearchBar  onSearchChange={handleSearch}  />

<FlatList
  ...
  data={searchedPersonajes}
  ...
/>
```
Entre otros componentes contamos con **MySearchBar** y con la **FlatList**.

 - *MySearchBar*: en su prop **OnSearchChange**, adjudica una función callback llamada **handleSearch** encargada de fijar como valor al estado de búsqueda el valor recibido.
```jsx
const  handleSearch  = (searchValue) => {
  setSearch(searchValue);
};
```
 - *FlatList*: a su prop **data** se le establecerá como valor el del estado de los personajes ya filtrados según la búsqueda. Ésto significa que en la lista siempre se mostrarán los personajes filtrados y no el resto, a no ser que **no** se esté buscando ninguno.

Éste último comportamiento se debe al método mencionado anteriormente: **managePersonajesBySearch**.
```jsx
const  managePersonajesBySearch  = () => {
  if (search  !==  "") {
  
	let  buscados  =  personajes.filter((p) =>
	p.name.toLowerCase().includes(search.toLowerCase())
	);
	
    setSearchedPersonajes(buscados);
    
  } else {
    setSearchedPersonajes(personajes);
  }
};
```
Brevemente;

Si el valor del estado de búsqueda es igual a una **cadena vacía** (no se está buscando nada), los "personajes buscados" serán **todos** los personajes almacenados en el *hook* de personajes.

En caso contrario, se **filtrará** dependiendo de si el nombre del personaje **incluye** el valor de la búsqueda.

> Recordamos que la función **managePersonajesBySearch** es ejecutada cada vez que se **actualizan** los estados de la **búsqueda** o los **personajes** ya que es llamada en *useEffect* con **dependencias** a estos valores.

![SearchBar imagen](assets/docImg/SearchBar.PNG?row=true)

# Navigation
Para la navegación de nuestra App hemos seguido la [documentación](https://reactnavigation.org/docs/getting-started/) de ReactNative y Expo.
Se trata de una **arquitectura** de desarrollo que nos permite navegar entre *Stacks*, y éstos *Stacks* entre pantallas.
Los componentes utilizados son los siguientes
```bash
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
```
## MyMenu
El componente MyMenu es el **contenedor principal** de la navegación entre stacks. 

> En nuestro caso, es un *TabNavigator*, un navegador entre *Botom Tabs*: tabuladores situados en la parte inferior.

Lo incorporamos en un *NavigationContainer* en *App.js*, el archivo /componente más prescincible de la App.
```js
export default function App() {
  return (
    <NavigationContainer>
      ...
      <MyMenu />
    </NavigationContainer>
  );
}
```
La estructura de nuestro componente MyMenu es la siguiente:
```jsx
<Tab.Navigator screenOptions={{...}}>
  <Tab.Screen
    name="Personajes"
    component={StackCharacter}
    options={{
      tabBarIcon: ({ size, color }) => {
        return (
          <MaterialCommunityIcons
            name="account"
            size={size}
            color={color}
          />
        );
      },
    }}
  />
  <Tab.Screen
    name="Mundos"
    component={StackMundo}
    options={{
      tabBarIcon: ({ size, color }) => {
        return (
          <MaterialCommunityIcons
            name="earth"
            size={size}
            color={color}
          />
        );
      },
    }}
  />
  <Tab.Screen
    name="Favoritos"
    initialParams={{ reRender: true }}
    component={FavoritosScreen}
    options={{
      tabBarIcon: ({ size, color }) => {
        return (
          <MaterialCommunityIcons
            name="progress-sta"
            size={size}
            color={color}
          />
        );
      },
    }}
  />
</Tab.Navigator>
```

 - TabNavigator: aloja los Tab.Screen
 - TabScreen: utiliza como componente los Stacks

Para los iconos usamos los [expo vector icons](https://icons.expo.fyi/Index) de la familia *MaterialCommunityIcons*.
## Stacks
Los Stacks nos permiten navegar entre pantallas. Establecen un enlace entre pantallas para que luego, desde éstas se pueda navegar hacia la otra contenida en el Stack.
Esta es su estructura, ejemplificando con el componente *StackMundo*:
```jsx
<MundoStack.Navigator>
  <MundoStack.Screen
    name="MundosScreen"
    component={MundosScreen}
    ... 
    options={{...}} 
  />
  <MundoStack.Screen
    name="Detalle"
    component={MundoDetails}
    ...
    options={{...}}
  />
</MundoStack.Navigator>
```
Se compone de un **Stack navegador** (*MundoStack.Navigator*) que engloba los dos **Stack de pantallas** (*MundoStack.Screen*).
Cada stack de pantalla hace referencia a una pantalla y entre todas las pantallas del stack se podra establecer navegación.

En nuestro caso son la **pantalla principal** y la del **detalle**.
## Screens
Como apuntamos anteriormente, para éste proyecto hemos dividido las pantallas en dos tipos.

 - Principales: implementarán la funcionalidad de nuestra app.
 - De detalle: únicamente tendrán la función de mostrar más detalles y alguna simple funcionalidad más.
 
 ### Principales
 
 - Mostrarán información recogida de la API de forma minimalista en nuestras **FlatList**
 - Se encargarán de dar la **orden** de navegar hacia las pantallas de detalle

Para ejemplificar usaremos el componente **MundosScreen**, el cual está estructurado de la siguiente forma:
```jsx
<ImageBackground source={...} style={styles.list}>
  ...
  <FlatList
    ...
    renderItem={({ item }) => (
      <TouchableOpacity
        onPress={() => navigation.navigate("Detalle", { item: item })}>
        <MundoCard key={item.id} item={item} />
      </TouchableOpacity>
    )}
    ...
  />
</ImageBackground>
```
Como se puede observar, cada componente que muestra la lista es un **TouchableOpacity**, un componente nativo de ReactNative que permite actuar como un **botón** pero con el **aspecto** de otro componente.
En nuestro caso, su aspecto sería el de nuestras **card**.

Lo interesante de éste componente es que al pulsarlo, nos permite realizar la **navegación** desde ésta pantalla hacia la pantalla de detalle añadiendo en su prop *onPress*la siguiente función: `()=>navigation.navigate("nombreStackScreen", {objeto de recursos que necesitemos})`

 - Navega hacia la pantalla de detalles
 - Proporciona el item pulsado de la lista

### Detalles

 - Recogen el elemento específico a detallar
 - Muestran los datos

Recoger el item a través de los parámetros proporcionados:
```jsx
export default function MundoDetails({ route }) {
  const { item } = route.params;
```
Mostrar datos:
```jsx
{/* Nombre del mundo */}
<View style={styles.colCenter}>
  <Text style={styles.name}>{item.name}</Text>
</View>
```
Además de estas dos funciones también realizan la funcionalidad de **añadir a favoritos** y, en el caso de los detalles de los mundos, **mostrar los personajes de cada mundo**.
Todo esto mediante llamadas a la **API**. El código está disponible en el repositorio.

# Video demostración

![Video Demostración](assets/docImg/demostración.mp4?row=true)
