import { useQuery } from '@apollo/client';

import { GET_REPOSITORIES } from '../graphql/queries';

const useRepositories = (queryVars) => {
	const { data, error, loading } = useQuery(GET_REPOSITORIES, {
		variables: queryVars,
		fetchPolicy: 'cache-network',
	});

	return { data, error, loading };
};

export default useRepositories;