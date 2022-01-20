import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import Home from '../Components/Home';
import Detail from '../Components/Detail';
import {Button} from 'react-native'

import React from 'react';

function Route() {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Contact" component={Home} />
        <Stack.Screen
          name="Contact Detail"
          component={Detail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Route;
