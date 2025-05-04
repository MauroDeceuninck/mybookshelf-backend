require("dotenv").config();
const mongoose = require("mongoose");
const cors = require("cors");

const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const indexRouter = require("./routes/index");
const usersRouter = require("./routes/users");

//const router = express.Router();

//const Book = require("./models/book");
//const verifyToken = require("./middleware/auth");

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

const app = express();
const bookRouter = require("./routes/books");
const authRouter = require("./routes/auth");

app.use(cors());
app.use(express.json());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/api/books", bookRouter);
app.use("/api/auth", authRouter);

module.exports = app;
