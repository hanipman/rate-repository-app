import React from 'react';
import { Pressable, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepository from '../hooks/useRepository';
import theme from '../theme';

const styles = StyleSheet.create({
  buttonContainer: {
    backgroundColor: 'white',
    padding: 10,
  },
  button: {
    backgroundColor: theme.colors.primary,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
  },
  buttonText: {
    textAlign: 'center',
  }
});

const SingleRepository = () => {
  const params = useParams();
  const { data, error, loading } = useRepository(params.id);
  
  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  const onPress = () => {
    Linking.openURL(data.repository.url);
  };

	return (
		<View>
      <RepositoryItem item={data.repository} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText} fontWeight='bold'>
            Open in Github
          </Text>
        </Pressable>
      </View>
    </View>
	);
};

export default SingleRepository;