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
import { addCupboard } from '../../providers/actions/Cupboard';
import Loading from '../../components/LoadingIndicator';
import colours from '../../providers/constants/colours';
import * as ROLES from '../../providers/constants/roles';
import commonStyles from '../../providers/constants/commonStyles';

import { getSites } from '../../providers/actions/Sites';

// import { AuthContext } from '../navigation/AuthProvider';\

const IMAGE_DIMENSION = 50;

const styles = StyleSheet.create({
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
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
  pickerContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    marginVertical: 10,
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
});

const validationSchema = yup.object().shape({
  siteID: yup.string().required('Required'),
  cupboardName: yup.string().required('Required'),
});

export default function UpdateCupboard({ route }) {
  LayoutAnimation.easeInEaseOut();
  const { cupboardObject } = route.params;
  const dispatch = useDispatch();

  const { allSites, isLoading } = useSelector((state) => ({
    allSites: state.sitesReducer.allSites,
    isLoading: state.appActionsReducer.isLoading,
  }));

  const handleUpdate = ({ siteID, cupboardName }) => {
    dispatch(addCupboard(siteID, cupboardName));
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
                siteID: cupboardObject ? cupboardObject.siteID : '',
                cupboardName:cupboardObject ? cupboardObject.cupboardName : '',
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
                      {cupboardObject ? 'Update Cupboard' : 'Add Cupboard'}
                    </Text>

                    <Text>Cupboard Name:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter cupboard name..."
                        value={values.cupboardName}
                        onChangeText={handleChange('cupboardName')}
                        onBlur={handleBlur('cupboardName')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.cupboardName || submitCount > 0) &&
                        errors.cupboardName}
                    </Text>


                        <Text style={{ marginTop: 10 }}>Site Name: </Text>
                        <View style={styles.pickerContainer}>
                          <Picker
                            selectedValue={values.siteID}
                            onValueChange={(value) =>
                              setFieldValue('siteID', value)
                            }
                          >
                            <Picker.Item label="Assign cupboard site" value="" />
                            {allSites.map((item) => (
                              <Picker.Item
                                key={item.siteID}
                                label={item.siteName}
                                value={item.siteID}
                              />
                            ))}
                          </Picker>
                        </View>
                        <Text style={{ color: 'red' }}>
                          {(touched.siteID || submitCount > 0) && errors.siteID}
                        </Text>

                        <TouchableOpacity
                          style={styles.bigBtn}
                          onPress={handleSubmit}
                          title="SUBMIT"
                        >
                          <Text style={{ color: 'white' }}>{cupboardObject ? 'Update' : 'Add'}</Text>
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
