import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./db/connect.js";
import AuthRoutes from "./router/AuthRouter.js";
import PostRoutes from "./router/PostRouter.js";

dotenv.config({
  path: "./.env",
});

const app = express();
app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.listen(5000, () => console.log("Running!"));

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1", PostRoutes);
