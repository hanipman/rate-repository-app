import React from 'react';
import { FlatList, Pressable, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-native';
import * as Linking from 'expo-linking';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import ReviewItem from './ReviewItem';
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
  },
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const RepositoryInfo = ({ repository }) => {
  const onPress = () => {
    Linking.openURL(repository.url);
  };

  return (
    <>
      <RepositoryItem item={repository} />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.button} onPress={onPress}>
          <Text style={styles.buttonText} fontWeight='bold'>
            Open in Github
          </Text>
        </Pressable>
      </View>
      <ItemSeparator />
    </>
  );
};

const SingleRepository = () => {
  const params = useParams();
  const { data, error, loading } = useRepository(params.id);
  
  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  const reviewNodes = data.repository.reviews ? data.repository.reviews.edges.map(edge => edge.node) : [];

	return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          item={item}
        />
      )}
      keyExtractor={({ id }) => id}
      ListHeaderComponent={() => <RepositoryInfo repository={data.repository} />}
    />
	);
};

export default SingleRepository;