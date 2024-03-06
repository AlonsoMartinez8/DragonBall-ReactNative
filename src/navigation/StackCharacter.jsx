import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonajesScreen from '../screens/PersonajesScreen';
import CharacterDetails from '../screens/CharacterDetails';

const CharacterStack = createNativeStackNavigator();

export default function StackCharacter({item}) {
  return (
    // Stack de personajes con la pantalla de personajes y la de detalles
    <CharacterStack.Navigator>
      <CharacterStack.Screen
        name="PersonajesScreen"
        component={PersonajesScreen}
        initialParams={{title:null}} 
        options={{
          headerShown: false,
          headerLeft: null,
          gestureEnabled: false
        }} 
      />
      <CharacterStack.Screen
        name="Detalle"
        initialParams={{ reRender: true }}
        component={CharacterDetails}
        options={{
          title: null,
          headerStyle: {backgroundColor:'#000'},
          headerTintColor: '#fff'
        }}
      />


    </CharacterStack.Navigator>
  )
}
