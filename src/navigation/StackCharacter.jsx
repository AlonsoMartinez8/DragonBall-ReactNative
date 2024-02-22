import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonajesScreen from '../screens/PersonajesScreen';
import CharacterDetails from '../screens/CharacterDetails';

const CharacterStack = createNativeStackNavigator();

export default function StackCharacter({item}) {
  return (
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
