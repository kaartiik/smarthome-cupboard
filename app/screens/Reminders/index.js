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
import { deleteItem, getItems } from '../../providers/actions/Item';
import commonStyles from '../../providers/constants/commonStyles';

import colours from '../../providers/constants/colours';
import { deleteReminder, getReminders } from '../../providers/actions/Reminder';

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
      onPress={() => 
        navigation.navigate('Reminders', {screen: 'ViewReminder', params: {reminderObject: item}})
      }
    >
      <View>
        <Text style={{ fontWeight: 'bold' }} numberOfLines={1}>
          {item.reminderName}
        </Text>
      </View>

      <TouchableOpacity
        style={{ marginHorizontal: 8 }}
        onPress={() => 
          navigation.navigate('Items', {screen: 'UpdateReminder', params: {reminderObject: item}})
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
              `Are you sure you want to delete ${item.reminderName} ?`,
              [
                {
                  text: 'Cancel',
                  onPress: () => console.log('Cancel Pressed'),
                  style: 'cancel',
                },
                {
                  text: 'OK',
                  onPress: () => dispatch(deleteReminder(item.reminderID)),
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

export default function ViewReminder({route}) {
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const [data, setData] = useState([]);

  const { allReminders, isLoading } = useSelector((state) => ({
    allReminders: state.reminderReducer.allReminders,
    isLoading: state.appActionsReducer.isLoading,
  }));

  useFocusEffect(
    useCallback(() => {
      dispatch(getReminders());
    }, [])
  );

  useEffect(() => {
    setData(allReminders);
  }, [allReminders]);

  const searchData = (searchText) => {
    let newData = [];
    if (searchText) {
      newData = allItems.filter((item) => {
        return item.reminderName.indexOf(searchText) > -1;
      });
      setData([...newData]);
    } else {
      setData([...allItems]);
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      {isLoading ? (
        <Loading />
      ) : (
        <View>
          <Text style={commonStyles.screenHeaderText}>Reminders</Text>
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
                <Text>No reminders</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
}
