import React, { useState } from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { Button, Menu, Searchbar } from 'react-native-paper';
import { useDebounce } from 'use-debounce';

import Text from './Text';
import RepositoryItem from './RepositoryItem';
import useRepositories from '../hooks/useRepositories';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  menuView: {
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  menuText: {
    color: 'black',
  }
});

// const repositories = [
//   {
//     id: 'jaredpalmer.formik',
//     fullName: 'jaredpalmer/formik',
//     description: 'Build forms in React, without the tears',
//     language: 'TypeScript',
//     forksCount: 1589,
//     stargazersCount: 21553,
//     ratingAverage: 88,
//     reviewCount: 4,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
//   },
//   {
//     id: 'rails.rails',
//     fullName: 'rails/rails',
//     description: 'Ruby on Rails',
//     language: 'Ruby',
//     forksCount: 18349,
//     stargazersCount: 45377,
//     ratingAverage: 100,
//     reviewCount: 2,
//     ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
//   },
//   {
//     id: 'django.django',
//     fullName: 'django/django',
//     description: 'The Web framework for perfectionists with deadlines.',
//     language: 'Python',
//     forksCount: 21015,
//     stargazersCount: 48496,
//     ratingAverage: 73,
//     reviewCount: 5,
//     ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
//   },
//   {
//     id: 'reduxjs.redux',
//     fullName: 'reduxjs/redux',
//     description: 'Predictable state container for JavaScript apps',
//     language: 'TypeScript',
//     forksCount: 13902,
//     stargazersCount: 52869,
//     ratingAverage: 0,
//     reviewCount: 0,
//     ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
//   },
// ];

const ItemSeparator = () => <View style={styles.separator} />;

const Order = {
  LATEST: 'Latest repository',
  HIGHEST_RATED: 'Highest rated repository',
  LOWEST_RATED: 'Lowest rated repository',
};

export class RepositoryListContainer extends React.Component {
  constructor(props) {
    super(props);
  }
  renderHeader = () => {
    const { orderBy, setOrderBy, visible, setVisible, searchQuery, setSearchQuery } = this.props;
    return (
      <>
        <Searchbar
          placeholder='Search'
          onChangeText={query => setSearchQuery(query)}
          value={searchQuery}
        />
        <View style={styles.menuView}>
          <Menu
            visible={visible}
            onDismiss={() => setVisible(false)}
            anchor={
              <Button color='black' style={styles.menuText} onPress={() => setVisible(true)}>{orderBy}</Button>
            }
          >
            <Menu.Item title={Order.LATEST} onPress={() => {
              setOrderBy(Order.LATEST);
              setVisible(false);
            }} />
            <Menu.Item title={Order.HIGHEST_RATED} onPress={() => {
              setOrderBy(Order.HIGHEST_RATED);
              setVisible(false);
            }} />
            <Menu.Item title={Order.LOWEST_RATED} onPress={() => {
              setOrderBy(Order.LOWEST_RATED);
              setVisible(false);
            }} />
          </Menu>
        </View>
      </>
    );
  }

  render() {
    const { repositories, onEndReached } = this.props;
    const repositoryNodes = repositories ? repositories.edges.map(edge => edge.node) : [];
    return (
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryItem
            key={item.id}
            item={item}
            testID='item'
          />
        )}
        ListHeaderComponent={this.renderHeader}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
      />
    );
  }
}

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState(Order.LATEST);
  const [visible, setVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [value] = useDebounce(searchQuery, 500);

  let val = null;
  switch (orderBy) {
    case Order.LATEST:
      val = useRepositories({ first: 8, orderDirection: 'DESC', orderBy: 'CREATED_AT', searchKeyword: value });
      break;
    case Order.HIGHEST_RATED:
      val = useRepositories({ first: 8, orderDirection: 'DESC', orderBy: 'RATING_AVERAGE', searchKeyword: value });
      break;
    case Order.LOWEST_RATED:
      val = useRepositories({ first: 8, orderDirection: 'ASC', orderBy: 'RATING_AVERAGE', searchKeyword: value });
      break;
    default:
      val = useRepositories();
  }

  const { repositories, fetchMore, loading, error } = val;

  if (loading) return null;
  if (error) return <Text>{`Error: ${error}`}</Text>;

  const onEndReached = () => {
    fetchMore();
  };

  return <RepositoryListContainer 
          repositories={repositories}
          orderBy={orderBy}
          setOrderBy={setOrderBy}
          visible={visible}
          setVisible={setVisible}
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          onEndReached={onEndReached}
        />;
};

// const RepositoryList = () => {
//   const { data, error, loading } = useRepositories();
//   if (loading) return null;
//   if (error) return `Error: ${error}`;

//   const repositoryNodes = data.repositories ? data.repositories.edges.map(edge => edge.node) : [];

//   return (
//     <FlatList
//       data={repositoryNodes}
//       ItemSeparatorComponent={ItemSeparator}
//       renderItem={({ item }) => (
//         <RepositoryItem
//           key={item.id}
//           item={item}
//         />
//       )}
//     />
//   );
// };

export default RepositoryList;