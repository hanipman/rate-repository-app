import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';

import AppBarTab from './AppBarTab';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
  },
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repository'}  route={'/'} />
        <AppBarTab text={'Sign In'} route={'/signin'} />
      </ScrollView>
    </View>
  );
};

export default AppBar;