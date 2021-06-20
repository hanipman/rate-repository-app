import React from 'react';
import { useHistory } from 'react-router-native';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useSignUp from '../hooks/useSignUp';
import useSignIn from '../hooks/useSignIn';

import theme from '../theme';

const styles = StyleSheet.create({
	container: {
    backgroundColor: 'white',
    padding: 10,
	},
  signUpButton: {
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: theme.colors.primary,
    margin: 5
  },
  buttonText: {
    margin: 5,
    textAlign: 'center',
  }
});

const initialValues = {
	username: '',
	password: '',
	password_confirmation: '',
};

const validationSchema = yup.object().shape({
	username: yup.string()
    .min(1)
    .max(30)
    .required('Username is required'),
	password: yup.string()
    .min(5)
    .max(50)
    .required('Password is required'),
	password_confirmation: yup.string()
    .oneOf([yup.ref('password'), null], 'Password does not match')
    .required('Password confirmation is required'),
});

const SignUp = () => {
	const [signUp] = useSignUp();
  const [signIn] = useSignIn();
	const history = useHistory();

	const onSubmit = async (values) => {
		const { username, password } = values;
		try {
      await signUp({ username, password });
      await signIn({ username, password });
      history.push('/');
		} catch (e) {
      console.log(e);
    }
	};

  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' secureTextEntry={true}/>
          <FormikTextInput name='password_confirmation' placeholder='Password Confirmation' secureTextEntry={true}/>
          <Pressable style={styles.signUpButton} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Sign Up</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignUp;