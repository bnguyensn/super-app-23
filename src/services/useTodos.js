import { gql, useQuery } from '@apollo/client';

const GET_TODOS = gql`
  query GetTodos {
    todos {
      id
      createdDate
      tags
      content
      done
      color
    }
  }
`;

export default function useTodos(queryOpts) {
  return useQuery(GET_TODOS, queryOpts);
}
