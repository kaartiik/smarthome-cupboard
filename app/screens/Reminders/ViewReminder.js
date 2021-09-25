import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  LayoutAnimation,
  KeyboardAvoidingView,
  Keyboard,
  ScrollView,
  TouchableWithoutFeedback,
  Platform,
  StyleSheet,
  TextInput,
  Image,
} from 'react-native';
import { Picker } from 'native-base';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Loading from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';
import * as ROLES from '../../providers/constants/roles';
import commonStyles from '../../providers/constants/commonStyles';

import { getSites } from '../../providers/actions/Sites';
import {addItem, updateItem } from '../../providers/actions/Item';
import { addReminder, updateReminder } from '../../providers/actions/Reminder';

// import { AuthContext } from '../navigation/AuthProvider';\

const IMAGE_DIMENSION = 50;

const styles = StyleSheet.create({
  bigBtn: {
    marginVertical: 5,
    marginHorizontal: 30,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 5,
  },

});

const validationSchema = yup.object().shape({
  reminderName: yup.string().required('Required'),
  reminderText: yup.string().required('Required'),
});

export default function ViewReminder({ route }) {
  LayoutAnimation.easeInEaseOut();
  const { reminderObject } = route.params;
  const navigation = useNavigation();

  const { isLoading } = useSelector((state) => ({
    isLoading: state.appActionsReducer.isLoading,
  }));

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>

                  <View style={{ padding: 10 }}>
                    <Text style={commonStyles.screenHeaderText}>
                      {reminderObject && reminderObject.reminderName}
                    </Text>


                    <Text>{reminderObject.reminderText}</Text>



                        <TouchableOpacity
                          style={styles.bigBtn}
                          onPress={() => 
                            navigation.navigate('Reminders', {screen: 'UpdateReminder', params: {reminderObject}})
                          }
                          title="SUBMIT"
                        >
                          <Text style={{ color: 'white' }}>{reminderObject && 'Edit'}</Text>
                        </TouchableOpacity>

                  </View>

          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
