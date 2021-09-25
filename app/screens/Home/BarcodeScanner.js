/* eslint-disable global-require */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { getCupboards, putCupboard } from '../../providers/actions/Cupboard';

function BarCodeScannerScreen() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    const scannedObject = JSON.parse(data);
    dispatch(putCupboard(scannedObject.cupboardID, scannedObject.cupboardName));
    navigation.navigate('Items', {screen: 'ViewItems'});
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
    </KeyboardAvoidingView>
  );
}

export default BarCodeScannerScreen;
