const { ApolloServer } = require("@apollo/server");
// const { startStandaloneServer } = require("@apollo/server/standalone");
const { expressMiddleware } = require("@apollo/server/express4");
const express = require("express");
const cors = require("cors");

const { mergeSchemas } = require("@graphql-tools/schema");

const { mongoConnect } = require("./../config/db.js");
const taskSchema = require("./schema/task.js");

const app = express();
app.use(express.json());
const port = 5000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type"],
  }),
);

const server = new ApolloServer({
  schema: mergeSchemas({
    schemas: [taskSchema],
  }),
});

async function startServer() {
  await mongoConnect();
  await server.start();

  app.use("/v1/graphql", expressMiddleware(server));

  app.listen(port, () => {
    console.log(`app listening at http://localhost:${port}`);
  });
}

startServer();
