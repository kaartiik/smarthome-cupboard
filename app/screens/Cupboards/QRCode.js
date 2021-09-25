import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  FlatList,
  StyleSheet,
} from 'react-native';
import { QRCode } from 'react-native-custom-qr-codes-expo';
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { getCupboards, putCupboard } from '../../providers/actions/Cupboard';
import commonStyles from '../../providers/constants/commonStyles';

import colours from '../../providers/constants/colours';

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 10,
  },
});



export default function QRCodeViewer() {
    const [qrContent, setQrContent] = useState(null);
    const [loading, setLoading] = useState(true);


  const { cupboardID, cupboardName, isLoading } = useSelector((state) => ({
    cupboardID: state.cupboardReducer.cupboardID,
    cupboardName: state.cupboardReducer.cupboardName,
    isLoading: state.appActionsReducer.isLoading,
  }));

  useEffect(() => {
    const cupboardDetails = {
        cupboardID,
        cupboardName
    };
    
    setQrContent(cupboardDetails);
  },[cupboardID, cupboardName])

  useEffect(() => {
    if(qrContent !== null) {
        setLoading(false)
    }
  },[qrContent])

  return (
    <View style={{ flex: 1, padding: 10, alignItems: 'center', justifyContent:'center' }}>
      {isLoading || loading? (
        <Loading />
      ) : (
        <View>
            <QRCode content={JSON.stringify(qrContent)} size={250}/>
        </View>
      )}
    </View>
  );
}
