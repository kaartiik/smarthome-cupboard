import React from 'react';
import { createStackNavigator, Header } from '@react-navigation/stack';
import { useNavigation } from '@react-navigation/native';
import ViewSites from '../screens/Sites';
import UpdateSites from '../screens/Sites/UpdateSites';
import AppBar from '../components/AppBar';
import AppBarLogout from '../components/AppBarLogout';
import AppBarAdd from '../components/AppBarAdd';
import AppBarBack from '../components/AppBarBack';

const Stack = createStackNavigator();

export default function SitesStack() {
  const navigation = useNavigation();

  return (
    <Stack.Navigator initialRouteName="ViewSites">
      <Stack.Screen
        name="ViewSites"
        component={ViewSites}
        options={{
          headerLeft: () => <AppBarLogout />,
          headerBackground: () => <AppBar />,
          headerRight: () => <AppBarAdd navigateTo="UpdateSites" />,
          headerTitleStyle: { display: 'none' },
        }}
      />
      <Stack.Screen
        name="UpdateSites"
        component={UpdateSites}
        options={{
          headerLeft: () => <AppBarBack />,
          headerBackground: () => <AppBar />,
          headerTitleStyle: { display: 'none' },
        }}
        initialParams={{ siteID: null, newSiteName: null }}
      />
    </Stack.Navigator>
  );
}
