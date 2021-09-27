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
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  StyleSheet,
  Button,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/LoadingIndicator';
import commonStyles from '../../providers/constants/commonStyles';

import colours from '../../providers/constants/colours';

import { uploadClockin } from '../../providers/actions/Checkpoint';
import { getSites } from '../../providers/actions/Sites';
import { getPermissions } from '../../providers/actions/Permissions';

import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
dayjs.extend(customParseFormat);

const SCREEN_WIDTH = Dimensions.get('window').width;

const styles = StyleSheet.create({
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});

const SitesSection = ({sites}) => {
  const navigation = useNavigation();
  return (
  <View style={{flex:1, marginVertical: 10}}>
    <Text style={commonStyles.screenHeaderText}>WHERE TO STORE?</Text>

<View style={{flexDirection:'row', flexWrap:'wrap'}}>
    {sites.map((site, idx) => (
      <TouchableOpacity onPress={() =>
        navigation.navigate('Cupboards', {screen: 'ViewCupboards', params: {
          siteID: site.siteID},
        })
      } key={idx} style={{backgroundColor: 'black', height: '80%', width: '40%', margin: 10, alignItems: 'center', justifyContent:'center'}}>
        <Text style={{color: 'white'}}>{site.siteName}</Text>
      </TouchableOpacity>
    ))}
    </View>

    <TouchableOpacity onPress={() => navigation.navigate('Sites', {screen: 'ViewSites'})}>
      <Text style={[commonStyles.screenHeaderText, {alignSelf: 'flex-end'}]}>VIEW MORE ></Text>
    </TouchableOpacity>
  </View>
)}

const Activities = () => {
  const navigation = useNavigation();
  return (
  <View style={{flex:1, marginTop: 15, marginVertical: 10}}>
    <Text style={commonStyles.screenHeaderText}>SELECT ACTIVITY</Text>

    <View style={{flexDirection: 'row', alignItems:'center', justifyContent:'space-around'}}>
      <TouchableOpacity
        style={{
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => navigation.navigate('BarcodeScannerScreen')}
      >
        <Ionicons name="ios-qr-code-outline" size={20} color="black" />
        <Text>SCAN BARCODE</Text>
      </TouchableOpacity>
      
      <TouchableOpacity style={{
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={() => navigation.navigate('Sites', {screen: 'UpdateSites'})}>
      <Ionicons name="ios-list" size={20} color="black" />
        <Text style={{color: 'black'}}>ADD SITE</Text>
      </TouchableOpacity>

      <TouchableOpacity style={{
          justifyContent: 'center',
          alignItems: 'center',
        }} onPress={() => navigation.navigate('Cupboards', {screen: 'UpdateCupboard'})}>
      <Ionicons name="ios-add" size={20} color="black" />
        <Text style={{color: 'black'}}>ADD CUPBOARD</Text>
      </TouchableOpacity>
    </View>
  </View>
)}



function Home({ navigation }) {
  const dispatch = useDispatch();
  const [homeSites, setHomeSites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [scanned, setScanned] = useState(false);
  const [scannedData, setScannedData] = useState('');
  const homeSections = ['Sites', 'Activities'];

  const { allSites, isLoading } = useSelector((state) => ({
    allSites: state.sitesReducer.allSites,
    isLoading: state.appActionsReducer.isLoading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getSites());
    }, [])
  );

  useEffect(() => {
    const fourSites = allSites.filter((site, idx) => idx < 4);
    setHomeSites(fourSites);
}, [allSites]);

  useEffect(() => {
      getPermission();
  }, []);

  const getPermission = async () => {
    const { status: cameraStatus } = await Permissions.getAsync(
      Permissions.CAMERA
    );

    if (cameraStatus !== 'granted') {
      dispatch(getPermissions());
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1, padding: 10 }}
    >
      {isLoading ? (
        <Loading />
      ) : (
          <ScrollView>
            <Text style={commonStyles.screenHeaderText}>YOUR SMART HOME CUPBOARD</Text>
            <Text>Store items through this app for better arrangement. Enjoy your day.</Text>

            <SitesSection sites={homeSites}/>

            <Activities />

        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}

export default Home;
