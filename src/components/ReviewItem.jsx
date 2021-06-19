import React from 'react';
import { View, StyleSheet } from 'react-native';

import Text from './Text';
import theme from '../theme';

const styles = StyleSheet.create({
	container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'row',
    backgroundColor: 'white',
    padding: 10
	},
	rating: {
    flex: 1,
    flexGrow: 1,
    padding: 10,
    margin: 10,
	},
  ratingText: {
    color: theme.colors.primary,
    textAlign: 'center',
    padding: 5,
    paddingTop: 10,
    width: 40,
    height: 40,
    borderRadius: 40 / 2,
    borderStyle: 'solid',
    borderColor: theme.colors.primary,
    borderWidth: 2,
  },
	textContainer: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    marginLeft: 5,
    marginRight: 5,
	},
});

const ReviewItem = ({ item }) => {
  const date = new Date(item.createdAt);

	return (
		<View style={styles.container}>
      <View styles={styles.rating}>
        <Text style={styles.ratingText} fontWeight='bold'>
          {item.rating}
        </Text>
      </View>
      <View style={styles.textContainer}>
       <Text color='textSecondary' fontWeight='bold'>
          {item.user.username}
        </Text>
        <Text color='textSecondary'>
          {date.toLocaleDateString()}
        </Text>
        <Text color='textSecondary'>
          {item.text}
        </Text>
      </View>
		</View>
	);
};

export default ReviewItem;
