import React from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  KeyboardAvoidingView,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  LayoutAnimation,
  StyleSheet,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Formik } from 'formik';
import * as yup from 'yup';
import Loading from '../../components/LoadingIndicator';
import { addSite, updateSite } from '../../providers/actions/Sites';
import commonStyles from '../../providers/constants/commonStyles';

import colours from '../../providers/constants/colours';

const styles = StyleSheet.create({
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginVertical: 10,
  },
  bigBtn: {
    marginHorizontal: 30,
    backgroundColor: colours.themePrimary,
    borderRadius: 4,
    height: 52,
    alignItems: 'center',
    justifyContent: 'center',
  },
  form: {
    marginBottom: 48,
    marginHorizontal: 30,
  },
});

const validationSchema = yup.object().shape({
  newSiteName: yup.string().required('Required'),
});

export default function UpdateSites({ route }) {
  const dispatch = useDispatch();
  const { siteID, siteName } = route.params;

  const { isLoading } = useSelector((state) => ({
    isLoading: state.appActionsReducer.isLoading,
  }));

  const handleUpdate = ({ newSiteName }) => {
    if (siteID === null || siteID === undefined) {
      dispatch(addSite(newSiteName));
    } else {
      dispatch(updateSite(siteID, newSiteName));
    }
  };

  LayoutAnimation.easeInEaseOut();

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
              initialValues={{ newSiteName: siteName ? siteName : '' }}
              onSubmit={(values) => handleUpdate(values)}
              validationSchema={validationSchema}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                touched,
                values,
                submitCount,
                errors,
              }) => {
                return (
                  <View style={{ padding: 10 }}>
                    <Text style={commonStyles.screenHeaderText}>
                      Update Site
                    </Text>

                    <Text>Site Name:</Text>
                    <View style={styles.textboxContainer}>
                      <TextInput
                        placeholder="Enter site name..."
                        value={values.newSiteName}
                        onChangeText={handleChange('newSiteName')}
                        onBlur={handleBlur('newSiteName')}
                      />
                    </View>
                    <Text style={{ color: 'red' }}>
                      {(touched.newSiteName || submitCount > 0) &&
                        errors.newSiteName}
                    </Text>
                    <TouchableOpacity
                      style={styles.bigBtn}
                      onPress={handleSubmit}
                      title="SUBMIT"
                    >
                      <Text style={{ color: 'white' }}>
                        {siteID === null || siteID === undefined
                          ? 'Add Site'
                          : 'Update Site'}
                      </Text>
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
