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
  itemName: yup.string().required('Required'),
  itemCount: yup.string().required('Required'),
});

export default function UpdateItem({ route }) {
  LayoutAnimation.easeInEaseOut();
  const { itemObject } = route.params;
  const dispatch = useDispatch();

  const { cupboardID, isLoading } = useSelector((state) => ({
    cupboardID: state.cupboardReducer.cupboardID,
    isLoading: state.appActionsReducer.isLoading,
  }));

  const handleUpdate = ({ itemName, itemCount }) => {
    if(itemObject === null || itemObject === undefined) {
      dispatch(addItem(cupboardID, itemName, itemCount));
    } else {
      dispatch(updateItem(cupboardID, itemObject.itemID, itemName, itemCount))
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
                itemName: itemObject ? itemObject.itemName : '',
                itemCount: itemObject ? itemObject.itemCount : '',
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
                      {itemObject ? 'Update Item':'Add Item'}
                    </Text>

                    <Text>Item Name:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter item name..."
                        value={values.itemName}
                        onChangeText={handleChange('itemName')}
                        onBlur={handleBlur('itemName')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.itemName || submitCount > 0) &&
                        errors.itemName}
                    </Text>


                    <Text>Item Count:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter item count..."
                        value={values.itemCount}
                        onChangeText={handleChange('itemCount')}
                        onBlur={handleBlur('itemCount')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.itemCount || submitCount > 0) &&
                        errors.itemCount}
                    </Text>


                        <TouchableOpacity
                          style={styles.bigBtn}
                          onPress={handleSubmit}
                          title="SUBMIT"
                        >
                          <Text style={{ color: 'white' }}>{itemObject === null || itemObject === undefined ? 'Add' : 'Update'}</Text>
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
