import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (queryVars) => {
	const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORIES, {
		variables: queryVars,
		fetchPolicy: 'cache-network',
	});

  const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repositories.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repositories.pageInfo.endCursor,
        ...queryVars,
      },
    });
  };

	return { 
    repositories: data?.repositories,
    fetchMore: handleFetchMore,
    error,
    loading
  };
};

export default useRepositories;