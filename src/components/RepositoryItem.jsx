import React from 'react';
import { Image, Pressable, View, StyleSheet } from 'react-native';
import { useHistory } from 'react-router-native';

import Text from './Text';

import theme from '../theme';

const style = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: 'white',
    padding: 10
  },
  flex_row: {
    display: 'flex',
    flexDirection: 'row',
    flexGrow: 1,
    padding: 5
  },
  flex_col: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    flexShrink: 1,
    padding: 5
  },
  descrip_col: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 5,
  },
  tinyLogo: {
    width: 50,
    height: 50,
    margin: 10
  },
  language_text: {
    flexGrow: 1,
    backgroundColor: theme.colors.primary,
    color: theme.colors.textPrimary,
    alignSelf: 'flex-start',
    borderStyle: 'solid',
    borderRadius: 5,
    overflow: 'hidden',
    padding: 5
  },
  stats: {
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center'
  }
});

const RepositoryItem = ({ item }) => {
  const history = useHistory();

  const formatValue = (val) => {
    if (val < 1000) {
      return val;
    }
    else {
      return Math.floor(val / 100)/10 + 'k';
    }
  };

  const onPress = () => {
    history.push(`/repository/${item.id}`);
  };

  return (
    <Pressable onPress={onPress} >
      <View style={style.container}>
        <View style={style.flex_row}> 
          <Image style={style.tinyLogo} source={{ uri: item.ownerAvatarUrl }} testID='logo' />
          <View style={style.flex_col}>
            <Text color='textSecondary' fontWeight='bold' style={{ flexGrow: 1 }} testID='fullName' >
              {item.fullName}
            </Text>
            <Text color='textSecondary' style={{ flexGrow: 1 }} testID='description'>
              {item.description}
            </Text>
            <Text style={style.language_text} testID='language'>
              {item.language}
            </Text>
          </View>
        </View>
        <View style={style.flex_row}>
          <View style={style.stats}>
            <Text color='textSecondary' fontWeight='bold' testID='star'>
              {formatValue(item.stargazersCount)}
            </Text>
            <Text color='textSecondary'>
              Stars
            </Text>
          </View>
          <View style={style.stats}>
            <Text color='textSecondary' fontWeight='bold' testID='fork'>
              {formatValue(item.forksCount)}
            </Text>
            <Text color='textSecondary'>
              Forks
            </Text>
          </View>
          <View style={style.stats}>
            <Text color='textSecondary' fontWeight='bold' testID='review'>
              {formatValue(item.reviewCount)}
            </Text>
            <Text color='textSecondary'>
              Reviews
            </Text>
          </View>
          <View style={style.stats}>
            <Text color='textSecondary' fontWeight='bold' testID='rating'>
              {formatValue(item.ratingAverage)}
            </Text>
            <Text color='textSecondary'>
              Rating
            </Text>
          </View>
        </View>
      </View>
    </Pressable>
  );
};

export default RepositoryItem;