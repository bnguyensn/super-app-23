const { gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');

exports.dateScalar = new GraphQLScalarType({
  name: 'Date',
  description: 'Date custom scalar type',
  serialize(value) {
    return value.getTime(); // Date -> Int
  },
  parseValue(value) {
    return new Date(value); // Int -> Date
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // AST string -> base 10 Int
    }
    return null; // Invalid AST string (not an int)
  },
});

exports.typeDefs = gql`
  # All available queries
  type Query {
    todos(tags: [String]): [TodoItem!]!
    tags: [String]
  }

  # All available mutations
  type Mutation {
    addTodo(input: MutateTodoInput!): TodoMutationResponse
    updateTodo(id: ID!, input: MutateTodoInput!): TodoMutationResponse
    deleteTodo(id: ID!): TodoMutationResponse
  }

  scalar Date

  enum Color {
    RED
    GREEN
    BLUE
  }

  "The Todo type"
  type TodoItem {
    "ID of the Todo"
    id: String!

    "Date the Todo was created"
    createdDate: Date!

    "An array of the todo's tags"
    tags: [String!]!

    "Content of the todo"
    content: String!

    "True if the todo is done"
    done: Boolean!

    "Color of the todo, either 'RED', 'GREEN', or 'BLUE'. Can also be null."
    color: Color
  }

  """
  Simple wrapper around our list of launches that contains a cursor to the last
  item in the list. Pass this cursor to the launches query to fetch results
  after these.
  """
  type TodoItemConnection {
    cursor: String!
    hasMore: Boolean!
    todos: [TodoItem!]!
  }

  # Input types are special object types that allow you to pass objects as
  # arguments to queries and mutations. They keep operation signatures clean.
  input MutateTodoInput {
    tags: [String!]
    content: String
    done: Boolean
    color: Color
  }

  # Generic mutation response that other mutation interfaces can extend
  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type TodoMutationResponse implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    todo: TodoItem
  }
`;
