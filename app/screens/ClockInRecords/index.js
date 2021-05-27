import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import {
  View,
  Image,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';

import AppBar from '../../components/AppBar';
import LoadingIndicator from '../../components/LoadingIndicator';

import colours from '../../providers/constants/colours';

import { getClockins } from '../../providers/actions/Checkpoint';

const styles = StyleSheet.create({
  divider: {
    marginHorizontal: 16,
    height: 0.5,
    width: '100%',
    backgroundColor: colours.borderGrey,
    alignSelf: 'center',
  },
  recipeDescription: {
    marginVertical: 3,
  },
  recipeItem: {
    padding: 5,
    backgroundColor: 'white',
    borderRadius: 6,
  },
  previewImg: {
    height: 100,
    width: 100,
    resizeMode: 'cover',
    alignSelf: 'flex-start',
    borderRadius: 6,
  },
  flatlistEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  searchBox: {
    marginTop: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: colours.veryLightPink,
    borderRadius: 3,
    padding: 5,
  },
});

const RenderItem = ({ item }) => {
  const dispatch = useDispatch();

  return (
    <View style={{ marginTop: 10, padding: 10 }}>
      <View style={styles.recipeItem}>
        <Text
          style={{
            fontSize: 15,
            color: colours.lightBlue,
            marginVertical: 3,
            flexShrink: 1,
          }}
        >
          {item.clocked_in_at}
        </Text>
        <Text style={styles.recipeDescription}>Recorder: {item.recorder}</Text>
        <Text style={styles.recipeDescription}>Altitude: {item.altitude}</Text>

        <Text style={styles.recipeDescription}>Latitude: {item.latitude}</Text>
        <Text style={styles.recipeDescription}>
          Longitude: {item.longitude}
        </Text>

        <Text style={styles.recipeDescription}>Address: {item.address}</Text>
      </View>

      {/* {isAdmin && (
          <TouchableOpacity
            onPress={() =>
              dispatch(
                deleteRecipe(item.rUid, item.rType, item.image.image_name)
              )
            }
          >
            <Ionicons name="ios-trash" size={25} color="red" />
          </TouchableOpacity>
        )} */}
    </View>
  );
};

RenderItem.propTypes = {
  item: PropTypes.object.isRequired,
};

function ClockInRecords({ navigation }) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const { clockIns, isLoading } = useSelector((state) => ({
    clockIns: state.checkpointReducer.clockIns,
    isLoading: state.checkpointReducer.isLoading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getClockins());
    }, [])
  );

  useEffect(() => {
    setData([...clockIns]);
  }, [clockIns]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = recipeFeed.filter((item) => {
        const uSearchText = searchText.toUpperCase();
        const uTitle = item.rTitle.toUpperCase();

        return uTitle.indexOf(uSearchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...recipeFeed]);
    }
  };

  return (
    <View style={{ flex: 1 }}>
      <AppBar />

      <View style={{ padding: 10 }}>
        <Text style={{ fontSize: 18 }}>Clock In Records</Text>

        <View style={styles.divider} />
      </View>

      {/* <View style={styles.searchBox}>
        <TextInput
          placeholder="Search..."
          value={search}
          onChangeText={(text) => {
            setSearch(text);
            searchData(text);
          }}
        />
      </View> */}

      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={data}
          renderItem={({ item, index }) => (
            <RenderItem key={index} item={item} />
          )}
          ListEmptyComponent={
            <View style={styles.flatlistEmptyContainer}>
              <Text>No clock in records yet</Text>
            </View>
          }
        />
      )}
    </View>
  );
}

export default ClockInRecords;
