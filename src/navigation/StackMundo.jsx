import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MundosScreen from '../screens/MundosScreen';
import MundoDetails from '../screens/MundoDetails';

const MundoStack = createNativeStackNavigator();

export default function StackMundo() {
  return (
    <MundoStack.Navigator>
      <MundoStack.Screen
        name="MundosScreen"
        component={MundosScreen}
      />
      <MundoStack.Screen
        name="MundoDetails"
        component={MundoDetails}
      />


    </MundoStack.Navigator>
  )
}
