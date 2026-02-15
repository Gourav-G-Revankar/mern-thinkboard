import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import notesRoutes from "./routes/notesRoutes.js";
import { connectDB } from "./config/db.js";

import rateLimiter from "./middleware/rateLimiter.js";

dotenv.config();

// const express = require("express") -> default way to call the express but now we are using module using import

const app = express();
const PORT = process.env.PORT || 5001;

// middleware
app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json()); // this middleware will parse JSON bodies: req.body
app.use(rateLimiter);

//our simple custom middleware for example
// app.use((req, res, next) => {
//   console.log(`Req method is ${req.method} & req URL is ${req.url}`);
//   next();
// });

app.use("/api/notes", notesRoutes);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server started on PORT: ", PORT);
  });
});
