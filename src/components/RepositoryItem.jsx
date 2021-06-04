import React from 'react';
import { Text, View } from 'react-native';

const RepositoryItem = ({ item }) => {
  return (
    <View>
      <Text>Full Name {item.fullName}</Text>
      <Text>Description: {item.description}</Text>
      <Text>Language: {item.language}</Text>
      <Text>Star: {item.stargazersCount}</Text>
      <Text>Forks: {item.forksCount}</Text>
      <Text>Reviews: {item.reviewsCount}</Text>
      <Text>Rating: {item.ratingAverage}</Text>
    </View>
  )
};

export default RepositoryItem;