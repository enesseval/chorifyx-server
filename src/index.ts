import { connectDB } from "./utils/db";
import dotenv from "dotenv";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs.generated";
import { resolvers } from "./schema/resolvers.generated";

dotenv.config();

const startServer = async () => {
   try {
      // Veritabanı Bağlantısı
      await connectDB();
      console.log("📦 Successfully connected to the database!");

      const server = new ApolloServer({
         typeDefs,
         resolvers,
         context: ({ req, res }) => ({ req, res }),
         cors: {
            origin: "http://localhost:3000",
            credentials: true,
         },
      });
      // Apollo Server Başlatma
      server.listen(5000).then(({ url }) => {
         console.log(`Server is up on ${url}`);
      });
   } catch (error) {
      console.error("❌ Error starting the server:", error);
   }
};

startServer();
