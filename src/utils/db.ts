import mongoose from "mongoose";

export const connectDB = async () => {
   const mongoUri = process.env.MONGO_URI;
   if (!mongoUri) throw new Error("MONGO_URI not found in environment variables");

   try {
      await mongoose.connect(mongoUri);
      console.log("MongoDB bağlantısı başarılı.");
   } catch (error) {
      console.error(`MongoDB bağlantısı hatalı: `, error);
      process.exit(1);
   }
};
