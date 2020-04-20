import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import FirstScreen from '../screens/FirstScreen';

const Stack = createStackNavigator();

export default function StackHome() {
  return (
    <Stack.Navigator headerMode="none">
      {/* <Stack.Screen name="First" component={FirstScreen} /> */}
      <Stack.Screen name="Home" component={Home} />
    </Stack.Navigator>
  );
}
