import { connectDB } from "./utils/db";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { ApolloServer } from "apollo-server";
import { typeDefs } from "./schema/typeDefs.generated";
import { resolvers } from "./schema/resolvers.generated";

dotenv.config();

const app = express();

app.use(cors({ credentials: true }));

const startServer = async () => {
   try {
      // Veritabanı Bağlantısı
      await connectDB();
      console.log("📦 Successfully connected to the database!");

      const server = new ApolloServer({
         typeDefs,
         resolvers,
         context: ({ req, res }) => ({ req, res }),
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
