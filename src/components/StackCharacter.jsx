import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import PersonajesScreen from '../screens/PersonajesScreen';
import CharacterDetails from '../screens/CharacterDetails';

const CharacterStack = createNativeStackNavigator();

export default function StackCharacter() {
  return (
    <CharacterStack.Navigator>
      <CharacterStack.Screen
        name="PersonajesScreen"
        component={PersonajesScreen}
      />
      <CharacterStack.Screen
        name="CharacterDetails"
        component={CharacterDetails}
      />


    </CharacterStack.Navigator>
  )
}
