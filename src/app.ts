import express from "express";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.routes";

const app = express();

app.use(
   cors({
      origin: true,
      credentials: true,
   })
);
app.use(helmet());
app.use(express.json());
app.use(cookieParser());

app.use("/auth", authRoutes);

app.get("/health", (_req, res) => {
   res.status(200).json({ status: "ok" });
});

export default app;
