/* eslint-disable global-require */
import React, { useState, useEffect, useCallback } from 'react';
import {
  Alert,
  TouchableOpacity,
  Text,
  View,
  FlatList,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Barometer } from 'expo-sensors';
import PropTypes from 'prop-types';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { Card, CardItem } from 'native-base';
import { Ionicons } from '@expo/vector-icons';
import AppBar from '../../components/AppBar';
import LoadingIndicator from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';

import { getRecipes } from '../../providers/actions/Checkpoint';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  navContainer: {
    flex: 1,
    backgroundColor: colours.themePrimary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconTitle: { fontFamily: 'sans-serif-light', fontSize: 18, color: 'white' },
  previewBGImg: {
    opacity: 0.5,
    height: 350,
    width: SCREEN_WIDTH / 2,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewBGImgFull: {
    opacity: 0.5,
    height: 350,
    width: '100%',
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
  },
  recipePreviewText: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
    flexWrap: 'wrap',
    margin: 5,
  },
});

function BarCodeScannerScreen({ navigation, route }) {
  const onScan = route.params;
  const dispatch = useDispatch();
  const [scanned, setScanned] = useState(false);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data.indexOf('Point') !== 0) {
      alert('Invalid QR Code. Scan a valid checkpoint QR Code.');
      return;
    }
    onScan(data);
    navigation.goBack();
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
