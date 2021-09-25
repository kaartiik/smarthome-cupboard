import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ViewItems from '../screens/Items';
import UpdateItem from '../screens/Items/UpdateItem';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarAdd from '../components/AppBarAdd';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function ItemsStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewItems">
      <Stack.Screen
        name="ViewItems"
        component={ViewItems}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerRight: () => <AppBarAdd navigateTo="UpdateItem" />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="UpdateItem"
        component={UpdateItem}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ itemObject: null}}
      />
    </Stack.Navigator>
  );
}
