import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import ClockInSites from '../screens/ClockInRecords';
import Records from '../screens/ClockInRecords/Records';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function RecordsStack() {
  return (
    <Stack.Navigator initialRouteName="ClockInSites">
      <Stack.Screen
        name="ClockInSites"
        component={ClockInSites}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="Records"
        component={Records}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
      />
    </Stack.Navigator>
  );
}
