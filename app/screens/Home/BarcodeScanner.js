/* eslint-disable global-require */
import React, { useState } from 'react';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { useNavigation } from '@react-navigation/native';

function BarCodeScannerScreen({ route }) {
  const onScan = route.params;
  const navigation = useNavigation();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data.indexOf('Point') !== 0) {
      alert('Invalid QR Code. Scan a valid checkpoint QR Code.');
      return;
    }
    onScan(data);
    navigation.navigate('Home');
    alert('Clocked in successfully.');
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
