import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const { DB_USER, DB_PASSWORD, DB_HOST, DB_PORT, DB_NAME, DATABASE_URL, NODE_ENV } = process.env;

const db_url = DATABASE_URL || `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}:${DB_PORT}/${DB_NAME}`;

const sequelize = new Sequelize(db_url, {
   dialect: "postgres",
   logging: false,
   dialectOptions: {
      ssl: NODE_ENV === "production" ? { require: true, rejectUnauthorized: false } : false,
   },
   define: {
      timestamps: true,
      underscored: false,
   },
});

export const connectDB = async () => {
   try {
      await sequelize.authenticate();
      console.log("✅ Database connection established.");
      await sequelize.sync({ alter: true });
      console.log("✅ Database synchronized.");
   } catch (error) {
      console.error("❌ Unable to connect to the database:", error);
      throw error;
   }
};

export default sequelize;
