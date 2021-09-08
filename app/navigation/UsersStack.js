import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ViewUsers from '../screens/Users';
import CreateUser from '../screens/Users/CreateUser';
import UpdateUser from '../screens/Users/UpdateUser';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarAdd from '../components/AppBarAdd';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function UsersStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewUsers">
      <Stack.Screen
        name="ViewUsers"
        component={ViewUsers}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerRight: () => <AppBarAdd navigateTo="CreateUser" />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="CreateUser"
        component={CreateUser}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="UpdateUser"
        component={UpdateUser}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ userObject: null }}
      />
    </Stack.Navigator>
  );
}
