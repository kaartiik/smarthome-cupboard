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
import { getUsers } from '../../providers/actions/User';
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
  return (
    <View
      style={{
        marginVertical: 10,
        padding: 10,
        backgroundColor: colours.white,
        borderRadius: 6,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View>
        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
          {item.name}
        </Text>

        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
          {item.siteName}
        </Text>
      </View>

      <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        onPress={() =>
          navigation.navigate('UpdateUser', {
            userObject: item,
          })
        }
      >
        <Ionicons
          name="create-outline"
          size={20}
          color={colours.themePrimary}
        />
      </TouchableOpacity>
    </View>
  );
};

export default function ViewUsers() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const { allUsers, isLoading } = useSelector((state) => ({
    allUsers: state.userReducer.allUsers,
    isLoading: state.appActionsReducer.isLoading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getUsers());
    }, [])
  );

  useEffect(() => {
    setData(allUsers);
  }, [allUsers]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = allUsers.filter((item) => {
        return item.name.indexOf(searchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...allUsers]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Text style={commonStyles.screenHeaderText}>Users</Text>
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
                <Text>No users</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
