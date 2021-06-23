import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useQuery } from '@apollo/client';

import { AUTHORIZED_USER } from '../graphql/queries';
import ReviewItem from './ReviewItem';
import Text from './Text';

const styles = StyleSheet.create({
	container: {

	}
});

const ItemSeparator = () => <View style={styles.separator} />;

const MyReviewList = () => {
	const { data, error, loading } = useQuery(AUTHORIZED_USER, {
    variables: { includeReviews: true },
    fetchPolicy: 'cache-and-network'
  });

  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  const reviewNodes = data.authorizedUser.reviews ? data.authorizedUser.reviews.edges.map(edge => edge.node) : [];

  console.log(reviewNodes);

  return (
    <FlatList
      data={reviewNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({ item }) => (
        <ReviewItem
          key={item.id}
          rating={item.rating}
          title={item.repository.fullName}
          createdAt={item.createdAt}
          text={item.text}
        />
      )}
    />
  );
};

export default MyReviewList;