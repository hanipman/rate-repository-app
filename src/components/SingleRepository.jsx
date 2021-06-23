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

class SingleRepositoryContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  renderHeader = () => {
    const { repository } = this.props;
    return (
      <RepositoryInfo repository={repository} />
    );
  }

  render() {
    const { repository, onEndReached } = this.props;
    const reviewNodes = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];
    return (
      <FlatList
        data={reviewNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <ReviewItem
            rating={item.rating}
            title={item.user.username}
            createdAt={item.createdAt}
            text={item.text}
          />
        )}
        keyExtractor={({ id }) => id}
        ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

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
  const { repository, fetchMore, error, loading } = useRepository({ id: params.id, first: 10  });
  
  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  // const reviewNodes = repository.reviews ? repository.reviews.edges.map(edge => edge.node) : [];

  const onEndReached = () => {
    fetchMore();
  };

	return (
    // <FlatList
    //   data={reviewNodes}
    //   ItemSeparatorComponent={ItemSeparator}
    //   renderItem={({ item }) => (
    //     <ReviewItem
    //       item={item}
    //     />
    //   )}
    //   keyExtractor={({ id }) => id}
    //   ListHeaderComponent={() => <RepositoryInfo repository={repository} />}
    //   onEndReached={onEndReached}
    //   onEndReachedThreshold={0.5}
    // />
    <SingleRepositoryContainer
      repository={repository}
      onEndReached={onEndReached}
    />
	);
};

export default SingleRepository;