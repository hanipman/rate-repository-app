import React from 'react';
import { useHistory } from 'react-router-native';
import { Pressable, View, StyleSheet } from 'react-native';
import { Formik } from 'formik';
import * as yup from 'yup';

import FormikTextInput from './FormikTextInput';
import Text from './Text';
import useCreateReview from '../hooks/useCreateReview';

import theme from '../theme';

const styles = StyleSheet.create({
	container: {
    backgroundColor: 'white',
    padding: 10,
	},
  button: {
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderRadius: 5,
    borderWidth: 2,
    backgroundColor: theme.colors.primary,
    margin: 5,
  },
  buttonText: {
    margin: 5,
    textAlign: 'center',
  }
});

const initialValues = {
	repo_owner_name: '',
	repo_name: '',
	rating: '',
	review_description: '',
};

const validationSchema = yup.object().shape({
	repo_owner_name: yup.string()
		.required('Repository owner name is required'),
	repo_name: yup.string().required('Repository Name is required'),
	rating: yup.number().integer().min(0).max(100).required('Rating is required'),
  review_description: yup.string(),
});

const CreateReview = () => {
  const [createReview] = useCreateReview();
  const history = useHistory();

  const onSubmit = async (values) => {
    const { repo_owner_name, repo_name, rating, review_description } = values;
    try {
      const { data, error } = await createReview({ repo_owner_name, repo_name, rating, review_description });
      console.log(error);
      console.log(data);
      history.push(`/repository/${data.createReview.repositoryId}`);
    } catch (e) {
      console.log(e);
    }
  };

	return (
    <Formik style={styles.container} initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {({ handleSubmit }) => (
        <View style={styles.container}>
          <FormikTextInput name='repo_owner_name' placeholder='Repository owner name' />
          <FormikTextInput name='repo_name' placeholder='Repository name' />
          <FormikTextInput name='rating' placeholder='Rating between 0 and 100' />
          <FormikTextInput name='review_description' placeholder='Review' />
          <Pressable style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>Create a review</Text>
          </Pressable>
        </View>
      )}
    </Formik>
  );
};

export default CreateReview;