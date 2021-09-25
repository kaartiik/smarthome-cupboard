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

export default function UpdateReminder({ route }) {
  LayoutAnimation.easeInEaseOut();
  const { reminderObject } = route.params;
  const dispatch = useDispatch();

  const { isLoading } = useSelector((state) => ({
    isLoading: state.appActionsReducer.isLoading,
  }));

  const handleUpdate = ({ reminderName, reminderText }) => {
    if(reminderObject === null || reminderObject === undefined) {
      dispatch(addReminder(reminderName, reminderText));
    } else {
      dispatch(updateReminder(reminderObject.reminderID, reminderName, reminderText))
    }
  };

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
            <Formik
              initialValues={{
                reminderName: reminderObject ? reminderObject.reminderName : '',
                reminderText: reminderObject ? reminderObject.reminderText : '',
              }}
              onSubmit={(values) => handleUpdate(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                setFieldValue,
                touched,
                values,
                submitCount,
                errors,
              }) => {
                return (
                  <View style={{ padding: 10 }}>
                    <Text style={commonStyles.screenHeaderText}>
                      {reminderObject ? 'Update Reminder':'Add Reminder'}
                    </Text>

                    <Text>Reminder Name:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter reminder name..."
                        value={values.reminderName}
                        onChangeText={handleChange('reminderName')}
                        onBlur={handleBlur('reminderName')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.reminderName || submitCount > 0) &&
                        errors.reminderName}
                    </Text>


                    <Text>Reminder Text:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter reminder..."
                        value={values.reminderText}
                        onChangeText={handleChange('reminderText')}
                        onBlur={handleBlur('reminderText')}
                        multiline
                        numberOfLines={10}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.reminderText || submitCount > 0) &&
                        errors.reminderText}
                    </Text>


                        <TouchableOpacity
                          style={styles.bigBtn}
                          onPress={handleSubmit}
                          title="SUBMIT"
                        >
                          <Text style={{ color: 'white' }}>{reminderObject === null || reminderObject === undefined ? 'Add' : 'Update'}</Text>
                        </TouchableOpacity>

                  </View>
                );
              }}
            </Formik>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
