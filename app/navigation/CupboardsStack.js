import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ViewCupboards from '../screens/Cupboards';
import UpdateCupboard from '../screens/Cupboards/UpdateCupboard';
import QRCode from '../screens/Cupboards/QRCode';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarAdd from '../components/AppBarAdd';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function CupboardsStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewCupboards">
      <Stack.Screen
        name="ViewCupboards"
        component={ViewCupboards}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerRight: () => <AppBarAdd navigateTo="UpdateCupboard" />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="UpdateCupboard"
        component={UpdateCupboard}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ cupboardObject: null }}
      />
      <Stack.Screen
        name="QRCode"
        component={QRCode}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
