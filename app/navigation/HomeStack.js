import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../screens/Home';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
