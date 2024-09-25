const { ApolloServer } = require('@apollo/server');
const { expressMiddleware } = require('@apollo/server/express4'); // Apollo v4 integration with Express
const { makeExecutableSchema } = require('@graphql-tools/schema');
const express = require('express');
const http = require('http');
const cors = require('cors');
const bodyParser = require('body-parser');

// Define GraphQL schema
const typeDefs = `
  type Query {
    books: [Book]
  }

  type Book {
    title: String
    author: String
  }
`;

// Define resolvers
const resolvers = {
  Query: {
    books: () => [
      { title: 'The Hobbit', author: 'J.R.R. Tolkien' },
      { title: '1984', author: 'George Orwell' },
    ],
  },
};

// Create schema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Initialize Apollo Server
const server = new ApolloServer({
  schema,
});

// Express server setup
const app = express();

// Middleware setup (Cors & Body-parser)
app.use(cors());
app.use(bodyParser.json());

// Start the Apollo Server
async function startServer() {
  await server.start(); // Start Apollo Server

  // Use Apollo middleware with express
  app.use('/graphql', expressMiddleware(server));

  // Create HTTP server
  const httpServer = http.createServer(app);

  // Listen on a port
  const PORT = 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server is running on http://localhost:${PORT}/graphql`);
  });
}

startServer();
