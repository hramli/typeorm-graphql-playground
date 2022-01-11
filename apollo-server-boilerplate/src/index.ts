import "reflect-metadata";
import { buildSchemaSync } from "type-graphql";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { UserResolver } from "./graphql/resolvers";
import * as express from "express";
import { ApolloServer } from "apollo-server-express";
import { printSchema } from "graphql";

const schema = buildSchemaSync({
    resolvers: [UserResolver],
    // automatically create `schema.gql` file with schema definition in project's working directory
    emitSchemaFile: true,
});
console.log(printSchema(schema));

const startServer = async () => {

    const server = new ApolloServer({schema: schema});
    await server.start();
    await createConnection();
    const app = express();
    server.applyMiddleware({ app });
    app.listen({ port: 4000 }, () =>
      console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
    );
  };

// createConnection().then(async connection => {

//     // console.log("Inserting a new user into the database...");
//     // const user = new User();
//     // user.firstName = "Harry";
//     // user.lastName = "Potter";
//     // user.age = 21;

//     // await user.save();
//     // console.log("Saved a new user with id: " + user.id);

//     console.log("Pulling all users from the database...");
//     const users = await User.find();

//     console.log("Users: ");
//     console.log(users);
// }).catch(error => console.log(error));

startServer();