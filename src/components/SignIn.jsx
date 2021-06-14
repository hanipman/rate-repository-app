import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  signInButton: {
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: theme.colors.primary,
    textAlign: 'center',
    margin: 5
  }
});

const initialValues = {
  username: '',
  password: '',
};

const validationSchema = yup.object().shape({
  username: yup.string()
    .required('Username is required'),
  password: yup.string()
    .required('Password is required')
});

const SignIn = () => {
  const [signIn] = useSignIn();

  const onSubmit = async (values) => {
    const { username, password } = values;
    try {
      const { data } = await signIn({ username, password });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <Formik style={styles.container} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry={true}/>
          <Pressable style={styles.signInButton} onPress={handleSubmit}>
            <Text style={styles.signInButton}>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;