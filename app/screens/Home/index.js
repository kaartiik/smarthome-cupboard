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
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import { Barometer } from 'expo-sensors';
import { useDispatch } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import commonStyles from '../../providers/constants/commonStyles';

import colours from '../../providers/constants/colours';

import { uploadClockin } from '../../providers/actions/Checkpoint';
import { getPermissions } from '../../providers/actions/Permissions';

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

function Home({ navigation }) {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);
  const [alt, setAlt] = useState(0);
  const [isSupported, setIsSupported] = useState(false);
  const [subscribed, setSubscribed] = useState(null);
  const seaLevelPressure = 1013.25;
  const powerValue = 1 / 5.257;
  const temperature = 32;
  const temperatureConvertConstant = 273.15;
  const divideByValue = 0.0065;
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');

  useEffect(() => {
    (async () => {
      getPermission();

      const isBarometerSupported = await Barometer.isAvailableAsync();

      setIsSupported(isBarometerSupported);

      if (isBarometerSupported) {
        alert('Sensor available..');
        subscribe();
      } else {
        alert('Sensor not available. Altitude cannot be measured.');
      }
    })();

    return () => Barometer.removeAllListeners();
  }, []);

  const calculateHeight = (currentPressure) => {
    const press = seaLevelPressure / currentPressure;
    const pressPower = Math.pow(press, powerValue);
    const pressPowerMinus = pressPower - 1;
    const temperatureConvert = temperature + temperatureConvertConstant;
    const pressPowerMultiplyTemp = pressPowerMinus * temperatureConvert;
    const height = pressPowerMultiplyTemp / divideByValue;

    return height;
  };

  const getPermission = async () => {
    const { status } = await Permissions.getAsync(Permissions.LOCATION);
    const { status: cameraStatus } = await Permissions.getAsync(
      Permissions.CAMERA
    );

    if (status !== 'granted' || cameraStatus !== 'granted') {
      dispatch(getPermissions());
    }
  };

  const subscribe = () => {
    const subscription = Barometer.addListener(({ pressure }) => {
      const height = calculateHeight(pressure);
      setAlt(height);
    });
  };

  const handleScan = async (scanData) => {
    const timestamp = Date.now();
    const timeAndDate = `${dayjs().format('hh:mm A DD-MM-YYYY')}`;
    const location = await Location.getLastKnownPositionAsync({
      accuracy: 6,
    });

    dispatch(uploadClockin(timestamp, timeAndDate, alt, location, scanData));
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, padding: 10 }}
    >
      <Text style={commonStyles.screenHeaderText}>Home</Text>

      <TouchableOpacity
        style={{
          flex: 1,
          marginVertical: 25,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 6,
          backgroundColor: colours.white,
          elevation: 5,
        }}
        onPress={() => navigation.navigate('BarcodeScannerScreen', handleScan)}
      >
        <Text>Scan QR</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

export default Home;
