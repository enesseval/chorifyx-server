import { connectDB } from "./utils/db";
import { typeDefs } from "./schemas/user.schema";
import { resolvers } from "./resolvers/user.resolver";
import { ApolloServer } from "apollo-server";
import dotenv from "dotenv";

dotenv.config();

const startServer = async () => {
   await connectDB();

   const server = new ApolloServer({ typeDefs, resolvers });

   server.listen(5000).then(({ url }) => {
      console.log(`🎉 Server ready at ${url} 🎉`);
   });
};

startServer();
