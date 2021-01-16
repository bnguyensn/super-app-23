const { ApolloServer, gql } = require('apollo-server');
const { GraphQLScalarType, Kind } = require('graphql');
const { v4: uuidv4 } = require('uuid');

// ========== DATA ========== //
// This data can come from anywhere: a database, a REST API, another GraphQL
// server, etc.

const RED = 'RED';
const GREEN = 'GREEN';
const BLUE = 'BLUE';

const TODOS = {
  '11788a18-0498-4264-8749-79e841e6cf9f': {
    id: '11788a18-0498-4264-8749-79e841e6cf9f',
    createdDate: new Date(1610810515569),
    tags: [],
    content: '',
    done: false,
    color: null,
  },
  '76aa2091-b630-4905-a782-4923d496fe1d': {
    id: '76aa2091-b630-4905-a782-4923d496fe1d',
    createdDate: new Date(1610810678947),
    tags: ['work'],
    content: '',
    done: false,
    color: BLUE,
  },
};

// ========== SCHEMA ========== //

const dateScalar = new GraphQLScalarType({
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

const typeDefs = gql`
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

  type TodoItem {
    id: String!
    createdDate: Date!
    tags: [String!]!
    content: String!
    done: Boolean!
    color: Color
  }

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

// ========== RESOLVERS ========== //
// Resolvers tell Apollo Server how to fetch the data associated with a
// particular type.

const filterTodosByTags = (todos, tags) => {
  return todos.filter((todo) => todo.tags.some((tag) => tags.includes(tag)));
};

const createNewTodo = ({ tags, content, done, color }) => {
  return {
    id: uuidv4(),
    createdDate: new Date(),
    tags: tags !== undefined ? tags : [],
    content: content !== undefined ? content : '',
    done: done !== undefined ? done : false,
    color: color !== undefined ? color : null,
  };
};

const resolvers = {
  Date: dateScalar,

  MutationResponse: {
    __resolveType(mutationResponse, context, info) {
      if (mutationResponse.todo) {
        return 'TodoMutationResponse';
      }

      return null;
    },
  },

  Query: {
    todos: async (root, { tags }) => {
      try {
        let todos = Object.values(TODOS);

        if (tags && Array.isArray(tags) && tags.length > 0) {
          todos = filterTodosByTags(todos, tags);
        }

        return todos;
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },

  Mutation: {
    addTodo: async (root, { input }) => {
      try {
        const { tags, content, done, color } = input;

        const newTodo = createNewTodo({ tags, content, done, color });

        TODOS[newTodo.id] = newTodo;

        return {
          code: 200,
          success: true,
          message: `Successfully added new todo`,
          todo: newTodo,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    updateTodo: async (root, { id, input }) => {
      try {
        if (!id || !TODOS[id]) {
          throw new Error(`Todo not found`);
        }

        if (Object.keys(input).length === 0) {
          throw new Error(`No update instructions`);
        }

        const updatedTodo = { ...TODOS[id], ...input };

        TODOS[id] = updatedTodo;

        return {
          code: 200,
          success: true,
          message: `Successfully updated todo`,
          todo: updatedTodo,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },

    deleteTodo: async (root, { id }) => {
      try {
        if (!id || !TODOS[id]) {
          throw new Error(`Todo not found`);
        }

        const deletedTodo = TODOS[id];

        delete TODOS[id];

        return {
          code: 200,
          success: true,
          message: `Successfully deleted todo`,
          todo: deletedTodo,
        };
      } catch (err) {
        console.error(err);
        throw err;
      }
    },
  },
};

// ========== SERVER START ========== //

const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }) => {
  console.log(`Apollo server ready at ${url}`);
});
