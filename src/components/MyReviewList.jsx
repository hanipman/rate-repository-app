import React from 'react';
import { Alert, FlatList, Pressable, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';
import { useHistory } from 'react-router-native';

import { AUTHORIZED_USER } from '../graphql/queries';
import useDeleteReview from '../hooks/useDeleteReview';
import ReviewItem from './ReviewItem';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
	buttonContainer: {
    flexDirection: 'row',
    backgroundColor: 'white',
    textAlign: 'center',
	},
  repoButton: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: theme.colors.primary,
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  deleteButton: {
    flexGrow: 1,
    margin: 10,
    backgroundColor: 'red',
    borderStyle: 'solid',
    borderRadius: 5,
    borderWidth: 2,
    borderColor: 'red',
  },
  buttonText: {
    padding: 10,
    textAlign: 'center',
  },
  separator: {
    height: 10,
  }
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewItem = ({ item, refresh }) => {
  const history = useHistory();
  const [deleteReview] = useDeleteReview();

  const goToRepo = () => {
    history.push(`/repository/${item.repository.id}`);
  };

  const handleDelete = async () => {
    Alert.alert(
      'Delete review',
      'Are you sure you want to delete this review',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Delete',
          onPress: async () => { 
            const { data } = await deleteReview(item.id);
            if (data.deleteReview) {
              refresh();
            }
          }
        }
      ]
    );
  };

  return (
    <>
      <ReviewItem
        key={item.id}
        rating={item.rating}
        title={item.repository.fullName}
        createdAt={item.createdAt}
        text={item.text}
      />
      <View style={styles.buttonContainer}>
        <Pressable style={styles.repoButton} onPress={goToRepo}>
          <Text style={styles.buttonText}>View repository</Text>
        </Pressable>
        <Pressable style={styles.deleteButton} onPress={handleDelete}>
          <Text style={styles.buttonText}>Delete review</Text>
        </Pressable>
      </View>
    </>
  );
};

const MyReviewList = () => {
	const { data, error, loading, refetch } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  const reviewNodes = data.authorizedUser.reviews ? data.authorizedUser.reviews.edges.map(edge => edge.node) : [];

  if (reviewNodes.length === 0) {
    return <Text 
            style={{ 
              textAlign: 'center',
              marginTop: 20
            }}
            fontSize='subheading'
            color='textSecondary'
            fontWeight='bold'
          >
            No reviews found
          </Text>;
  }

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <MyReviewItem item={item} refresh={refetch}/>
      )}
      keyExtractor={(item) => item.id}
    />
  );
};

export default MyReviewList;