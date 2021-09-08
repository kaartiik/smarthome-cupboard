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
import { getSites, deleteSite } from '../../providers/actions/Sites';
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
  const dispatch = useDispatch();
  const navigation = useNavigation();
  return (
    <View
      style={{
        marginVertical: 10,
        padding: 10,
        backgroundColor: colours.white,
        borderRadius: 6,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
        {item.siteName}
      </Text>

      <View style={{ flexDirection: 'row' }}>
        <TouchableOpacity
          style={{ marginHorizontal: 8 }}
          onPress={() =>
            navigation.navigate('UpdateSites', {
              siteID: item.siteID,
              siteName: item.siteName,
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
              `Are you sure you want to delete the site ${item.siteName} ?`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => dispatch(deleteSite(item.siteID)),
                },
              ]
            )
          }
        >
          <Ionicons name="ios-trash-outline" size={20} color="red" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default function ViewSites() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

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
    setData(allSites);
  }, [allSites]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = allSites.filter((item) => {
        return item.siteName.indexOf(searchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...allSites]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Text style={commonStyles.screenHeaderText}>Sites</Text>

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
                <Text>No sites</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
