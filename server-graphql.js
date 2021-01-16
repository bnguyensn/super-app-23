const { ApolloServer } = require('apollo-server');
const { v4: uuidv4 } = require('uuid');

const { typeDefs } = require('./server-graphql-schema');
const { ColorAPI, BLUE } = require('./server-datasources');
const resolvers = require('./server-resolvers');

// ========== SERVER START ========== //

const server = new ApolloServer({
  typeDefs,
  resolvers,
  formatError: (err) => {
    if (err.extensions.code === '500') {
      return new Error(`Internal server error`);
    }

    return err;
  },
  dataSources: () => {
    return {
      colorAPI: new ColorAPI(),
    };
  },

  // Testing
  // mocks: {
  //   Date: () => new Date(),
  //   TodoItem: () => ({
  //     id: uuidv4(),
  //     createdDate: new Date(),
  //     tags: [],
  //     content: 'Hello, world!',
  //     done: false,
  //     color: BLUE,
  //   }),
  // },
});

server.listen().then(({ url }) => {
  console.log(`Apollo server ready at ${url}`);
});
