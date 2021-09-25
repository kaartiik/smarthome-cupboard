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
import { Ionicons } from '@expo/vector-icons';
import Loading from '../../components/LoadingIndicator';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { deleteCupboard, getCupboards, putCupboard } from '../../providers/actions/Cupboard';
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

const RenderItem = ({ item }) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  return (
    <TouchableOpacity
      style={{
        marginVertical: 10,
        padding: 10,
        backgroundColor: colours.white,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
      onPress={() =>{
        dispatch(putCupboard(item.cupboardID, item.cupboardName));
        navigation.navigate('Items', {screen: 'ViewItems'})
      }
      }
    >
      <View>
        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
          {item.cupboardName}
        </Text>
      </View>

      <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        onPress={() => {
          dispatch(putCupboard(item.cupboardID, item.cupboardName));
          navigation.navigate('QRCode');
        }}
      >
        <Ionicons
          name="ios-qr-code-outline"
          size={20}
          color={colours.themePrimary}
        />
      </TouchableOpacity>

      <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        onPress={() =>
          navigation.navigate('UpdateCupboard', {
            cupboardObject: item,
          })
        }
      >
        <Ionicons
          name="create-outline"
          size={20}
          color={colours.themePrimary}
        />
      </TouchableOpacity>
      
      <TouchableOpacity
          style={{ marginHorizontal: 8 }}
          onPress={() =>
            Alert.alert(
              'Deleting site',
              `Are you sure you want to delete ${item.cupboardName} ?`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => dispatch(deleteCupboard(item.siteID, item.cupboardID)),
                },
              ]
            )
          }
        >
          <Ionicons name="ios-trash-outline" size={20} color="red" />
        </TouchableOpacity>
    </TouchableOpacity>
  );
};

export default function ViewCupboards({route}) {
  const { siteID } = route.params;
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const { allCupboards, isLoading } = useSelector((state) => ({
    allCupboards: state.cupboardReducer.allCupboards,
    isLoading: state.appActionsReducer.isLoading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getCupboards(siteID));
    }, [])
  );

  useEffect(() => {
    setData(allCupboards);
  }, [allCupboards]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = allCupboards.filter((item) => {
        return item.cupboardName.indexOf(searchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...allCupboards]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Text style={commonStyles.screenHeaderText}>Cupboards</Text>
          <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={data}
            ListHeaderComponent={
              <View style={styles.textboxContainer}>
                <TextInput
                  placeholder="Search..."
                  value={search}
                  onChangeText={(text) => {
                    setSearch(text);
                    searchData(text);
                  }}
                />
              </View>
            }
            renderItem={({ item, index }) => (
              <RenderItem key={index} item={item} />
            )}
            ListEmptyComponent={
              <View style={styles.flatlistEmptyContainer}>
                <Text>No cupboards</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
