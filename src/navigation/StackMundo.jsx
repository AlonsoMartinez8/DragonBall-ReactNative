import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MundosScreen from '../screens/MundosScreen';
import MundoDetails from '../screens/MundoDetails';

const MundoStack = createNativeStackNavigator();

export default function StackMundo() {
  return (
    // Stack de mundos con la pantalla de mundos y la de detalles
    <MundoStack.Navigator>
      
      <MundoStack.Screen
        name="MundosScreen"
        component={MundosScreen}
        initialParams={{title:null}} 
        options={{
          headerShown: false,
          headerLeft: null,
          gestureEnabled: false
        }} 
      />

      <MundoStack.Screen
        name="Detalle"
        component={MundoDetails}
        options={{
          title: null,
          headerStyle: {backgroundColor:'#000'},
          headerTintColor: '#fff'
        }}
      />
      
    </MundoStack.Navigator>
  )
}
