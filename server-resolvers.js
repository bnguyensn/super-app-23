const { ApolloError } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

const { TODOS, ColorAPI, BLUE, GREEN, RED } = require('./server-datasources');
const { dateScalar } = require('./server-graphql-schema');

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
    todos: async (_, { tags }, context, info) => {
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
    addTodo: async (_, { input }) => {
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

    updateTodo: async (_, { id, input }) => {
      try {
        if (!id || !TODOS[id]) {
          throw new ApolloError(`Todo not found`, '404');
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

    deleteTodo: async (_, { id }) => {
      try {
        if (!id || !TODOS[id]) {
          throw new ApolloError(`Todo not found`, '404');
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

module.exports = resolvers;
