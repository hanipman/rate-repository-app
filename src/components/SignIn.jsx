import React from 'react';
import { Pressable, View } from 'react-native';
import { Formik } from 'formik';

import FormikTextInput from './FormikTextInput';
import Text from './Text';

const initialValues = {
  username: '',
  password: '',
};

const SignIn = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit} >
      {({ handleSubmit }) => (
        <View>
          <FormikTextInput name='username' placeholder='Username' />
          <FormikTextInput name='password' placeholder='Password' />
          <Pressable onPress={handleSubmit}>
            <Text>Sign In</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default SignIn;