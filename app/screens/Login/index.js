import React, { useContext } from 'react';
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
} from 'react-native';
import Loading from '../../components/LoadingIndicator';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { login } from '../../providers/actions/User';
import colours from '../../providers/constants/colours';

// import { AuthContext } from '../navigation/AuthProvider';\

const styles = StyleSheet.create({
  greeting: {
    marginTop: 32,
    fontSize: 18,
    fontWeight: '400',
    textAlign: 'center',
  },
  textboxContainer: {
    backgroundColor: colours.themePrimaryLight,
    borderRadius: 3,
    padding: 5,
    marginBottom: 5,
  },
  bigBtn: {
    marginTop: 10,
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
  email: yup
    .string()
    .required('Required')
    .email('Please enter valid email address.'),
  password: yup
    .string()
    .required('Required')
    .min(6, 'Minimum 6 characters required.'),
});

export default function Login() {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const { isLoading } = useSelector((state) => ({
    isLoading: state.appActionsReducer.isLoading,
  }));

  const handleLogin = ({ email, password }) => {
    dispatch(login({ email, password }));
  };

  LayoutAnimation.easeInEaseOut();

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{ flex: 1 }}
    >
      <StatusBar barStyle="default" />

      {isLoading ? (
        <Loading />
      ) : (
        <ScrollView>
          <Text style={styles.greeting}>{'Hello again.\nWelcome back.'}</Text>

          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.form}>
              <Formik
                initialValues={{ email: '', password: '' }}
                onSubmit={(values) => handleLogin(values)}
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
                      <Text>Email</Text>
                      <View style={styles.textboxContainer}>
                        <TextInput
                          placeholder="Enter email..."
                          value={values.email}
                          onChangeText={handleChange('email')}
                          onBlur={handleBlur('email')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.email || submitCount > 0) && errors.email}
                      </Text>

                      <Text>Password</Text>

                      <View style={styles.textboxContainer}>
                        <TextInput
                          secureTextEntry
                          placeholder="Enter password..."
                          value={values.password}
                          onChangeText={handleChange('password')}
                          onBlur={handleBlur('password')}
                        />
                      </View>
                      <Text style={{ color: 'red' }}>
                        {(touched.password || submitCount > 0) &&
                          errors.password}
                      </Text>

                      <TouchableOpacity
                        style={styles.bigBtn}
                        onPress={handleSubmit}
                        title="SUBMIT"
                      >
                        <Text style={{ color: 'white' }}>Sign In</Text>
                      </TouchableOpacity>
                    </View>
                  );
                }}
              </Formik>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('Register')}
              >
                <Text style={{ color: 'blue' }}>Dont have an account? Register here.</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center' }}
                onPress={() => navigation.navigate('ForgotPassword')}
              >
                <Text style={{ color: 'blue' }}>Forgot Password</Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      )}
    </KeyboardAvoidingView>
  );
}
