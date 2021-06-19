import { useMutation } from '@apollo/client';

import { CREATE_REVIEW } from '../graphql/mutations';

const useCreateReview = () => {
	const [mutate, result] = useMutation(CREATE_REVIEW);

	const createReview = async ({ repo_owner_name, repo_name, rating, review_description }) => {
		const rating_val = parseInt(rating);
		const result = await mutate({ variables: { repo_owner_name, repo_name, rating: rating_val, review_description }});

		return result;
	};

	return [createReview, result];
};

export default useCreateReview;