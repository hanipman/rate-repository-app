import { useQuery } from '@apollo/client';

import { GET_REPOSITORY } from '../graphql/queries';

const useRepository = (queryVars) => {
	const { data, error, loading, fetchMore } = useQuery(GET_REPOSITORY, {
		variables: queryVars,
		fetchPolicy: 'cache-network',
	});
	
	const handleFetchMore = () => {
    const canFetchMore = !loading && data?.repository.reviews.pageInfo.hasNextPage;

    if (!canFetchMore) {
      return;
    }

    fetchMore({
      variables: {
        after: data.repository.reviews.pageInfo.endCursor,
        ...queryVars,
      }
    });
  };

	return { 
    repository: data?.repository,
    fetchMore: handleFetchMore,
    error,
    loading
  };
};

export default useRepository;