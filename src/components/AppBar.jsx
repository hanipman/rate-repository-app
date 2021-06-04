import React from 'react';
import { View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    paddingTop: Constants.statusBarHeight,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <AppBarTab text={'Repository'}  route={'/'} />
      <AppBarTab text={'Sign In'} route={'/signin'} />
    </View>
  );
};

export default AppBar;