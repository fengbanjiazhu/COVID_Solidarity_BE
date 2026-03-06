import cors from "cors";
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import rateLimit from "express-rate-limit";
// import mongoSanitize from "express-mongo-sanitize";
// import { xss } from "express-xss-sanitizer";

// Routes
import userRoute from "./Routes/userRoute.js";

const app = express();

if (process.env.NODE_ENV !== "production") {
  dotenv.config({ path: "./config.env" });
}

app.use(
  cors({
    origin: "*",
  }),
);

// app.use(express.json({ limit: "1mb" }));
// app.use(express.urlencoded({ extended: true, limit: "100kb" }));
// app.use(mongoSanitize());
// app.use(xss());

app.use(function (req, res, next) {
  console.log("Query:", req.query);
  console.log("Params:", req.params);
  console.log("Body:", req.body);
  next();
});

// Rate limiting
const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 1000,
  message: {
    success: false,
    message: "Too many requests from this IP, please try again later!",
  },
});

// Routes
app.use("/api/user", userRoute);

// Global Error Handler
// app.use(errorController);

// Support both local (.env) and pipeline (db, dbpass) environment variable names
const DATABASE = process.env.DATABASE;
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;

if (!DATABASE || !DATABASE_PASSWORD) {
  throw new Error("Missing DATABASE/DB or DATABASE_PASSWORD/DBPASS environment variables");
}

const DB = DATABASE.replace("<db_password>", DATABASE_PASSWORD);

mongoose
  .connect(DB)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log("Connection ERROR💥:", err));

if (process.env.JEST_WORKER_ID === undefined) {
  // Only start server if not in test
  const port = process.env.PORT || 8000;
  app.listen(port, () => {
    console.log(`app running on ${port}...`);
  });
}

export default app;
