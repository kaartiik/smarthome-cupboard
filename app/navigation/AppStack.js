import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import BottomTabNavigator from './BottomTabNavigator';
import BarcodeScannerScreen from '../screens/Home/BarcodeScanner';
import SitesStack from './SitesStack';
import CupboardsStack from './CupboardsStack';
import ItemsStack from './ItemsStack';


const Stack = createStackNavigator();

export default function MainStack() {
  // const { isAdmin } = useContext(AuthContext);

  const { isAdmin } = useSelector((state) => ({
    isAdmin: state.userReducer.isAdmin,
  }));

  return (
    <Stack.Navigator initialRouteName="MyTabs" mode="modal" headerMode="none">
      <Stack.Screen name="MyTabs" component={BottomTabNavigator} />
      <Stack.Screen name="Sites" component={SitesStack} />
      <Stack.Screen name="Cupboards" component={CupboardsStack} />
      <Stack.Screen name="Items" component={ItemsStack} />
      <Stack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      />
    </Stack.Navigator>
  );
}
