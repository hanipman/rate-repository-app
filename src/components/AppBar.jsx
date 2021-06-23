import React from 'react';
import { Pressable, ScrollView, View, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import { useApolloClient, useQuery } from '@apollo/client';
import { useHistory } from 'react-router-native';

import AppBarTab from './AppBarTab';
import { AUTHORIZED_USER } from '../graphql/queries';
import useAuthStorage from '../hooks/useAuthStorage';
import Text from './Text';

import theme from '../theme';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    color: theme.colors.textPrimary,
    backgroundColor: theme.colors.primary,
  },
  signOut: {
		flexGrow: 1,
		marginTop: 10,
    marginBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
	}
});

const AppBar = () => {
  const { data, loading, error } = useQuery(AUTHORIZED_USER);
  const authStorage = useAuthStorage();
  const apolloClient = useApolloClient();
  const history = useHistory();
  console.log(data);

  if (loading) return null;
  if (error) return `Error: ${error}`;

  const signOut = async () => {
    await authStorage.removeAccessToken();
    apolloClient.resetStore();
    history.push('/');
  };

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
        <AppBarTab text={'Repository'}  route={'/'} />
        {data.authorizedUser == null ?
          <><AppBarTab text={'Sign In'} route={'/signin'} />
          <AppBarTab text={'Sign Up'} route={'/signup'} /></>:
          <><AppBarTab text={'Create a review'} route={'/review'} />
          <AppBarTab text={'My reviews'} route={'/myreviews'} />
          <Pressable style={styles.signOut} onPress={signOut}><Text>Sign Out</Text></Pressable></>
        }
      </ScrollView>
    </View>
  );
};

export default AppBar;