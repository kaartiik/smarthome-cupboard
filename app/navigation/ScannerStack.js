import React, { useContext } from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import { useSelector } from 'react-redux';
import Home from '../screens/Home';
import BarcodeScannerScreen from '../screens/Home/BarcodeScanner';

const Stack = createStackNavigator();

export default function ScannerStack() {
  return (
    <Stack.Navigator initialRouteName="Home" mode="modal" headerMode="none">
      <Stack.Screen name="Home" component={Home} />
      {/* <Stack.Screen
        name="BarcodeScannerScreen"
        component={BarcodeScannerScreen}
      /> */}
    </Stack.Navigator>
  );
}
