import React from 'react';
import { render } from '@testing-library/react-native';
import { RepositoryListContainer } from '../../components/RepositoryList';

describe('RepositoryList', () => {
	describe('RepositoryListContainer', () => {
    it('renders repository information correctly', () => {
      const repositories = {
        totalCount: 8,
        pageInfo: {
          hasNextPage: true,
          endCursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          startCursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
        },
        edges: [
          {
            node: {
              id: 'jaredpalmer.formik',
              fullName: 'jaredpalmer/formik',
              description: 'Build forms in React, without the tears',
              language: 'TypeScript',
              forksCount: 1619,
              stargazersCount: 21856,
              ratingAverage: 88,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
            },
            cursor: 'WyJqYXJlZHBhbG1lci5mb3JtaWsiLDE1ODg2NjAzNTAwNzZd',
          },
          {
            node: {
              id: 'async-library.react-async',
              fullName: 'async-library/react-async',
              description: 'Flexible promise-based React data loader',
              language: 'JavaScript',
              forksCount: 69,
              stargazersCount: 1760,
              ratingAverage: 72,
              reviewCount: 3,
              ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/54310907?v=4',
            },
            cursor: 'WyJhc3luYy1saWJyYXJ5LnJlYWN0LWFzeW5jIiwxNTg4NjU2NzUwMDc2XQ==',
          },
        ],
      };

      const { getAllByTestId } = render(<RepositoryListContainer repositories={repositories} />);
      
      const logos = getAllByTestId('logo');
      expect(logos.length).toEqual(2);
      expect(logos[0].props.source.uri).toEqual(repositories.edges[0].node.ownerAvatarUrl);
      expect(logos[1].props.source.uri).toEqual(repositories.edges[1].node.ownerAvatarUrl);

      const names = getAllByTestId('fullName');
      expect(names.length).toEqual(2);
      expect(names[0]).toHaveTextContent(repositories.edges[0].node.fullName);
      expect(names[1]).toHaveTextContent(repositories.edges[1].node.fullName);

      const descriptions = getAllByTestId('description');
      expect(descriptions.length).toEqual(2);
      expect(descriptions[0]).toHaveTextContent(repositories.edges[0].node.description);
      expect(descriptions[1]).toHaveTextContent(repositories.edges[1].node.description);

      const languages = getAllByTestId('language');
      expect(languages.length).toEqual(2);
      expect(languages[0]).toHaveTextContent(repositories.edges[0].node.language);
      expect(languages[1]).toHaveTextContent(repositories.edges[1].node.language);

      const stars = getAllByTestId('star');
      expect(stars.length).toEqual(2);
      expect(stars[0]).toHaveTextContent('21.8k');
      expect(stars[1]).toHaveTextContent('1.7k');

      const forks = getAllByTestId('fork');
      expect(forks.length).toEqual(2);
      expect(forks[0]).toHaveTextContent('1.6k');
      expect(forks[1]).toHaveTextContent(repositories.edges[1].node.forksCount);

      const reviews = getAllByTestId('review');
      expect(reviews.length).toEqual(2);
      expect(reviews[0]).toHaveTextContent(repositories.edges[0].node.reviewCount);
      expect(reviews[1]).toHaveTextContent(repositories.edges[1].node.reviewCount);

      const ratings = getAllByTestId('rating');
      expect(ratings.length).toEqual(2);
      expect(ratings[0]).toHaveTextContent(repositories.edges[0].node.ratingAverage);
      expect(ratings[1]).toHaveTextContent(repositories.edges[1].node.ratingAverage);
    });
	});
});