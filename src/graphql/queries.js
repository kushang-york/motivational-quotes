/* eslint-disable */
// this is an auto generated file. This will be overwritten

export const getThought = /* GraphQL */ `
  query GetThought($id: ID!) {
    getThought(id: $id) {
      id
      author
      text
      createdAt
      updatedAt
      __typename
    }
  }
`;
export const listThoughts = /* GraphQL */ `
  query ListThoughts(
    $filter: ModelThoughtFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listThoughts(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        author
        text
        createdAt
        updatedAt
        __typename
      }
      nextToken
      __typename
    }
  }
`;
