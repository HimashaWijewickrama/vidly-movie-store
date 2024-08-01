const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();

const PORT = process.env.PORT || 8050;

app.use(cors());
//app middle ware
app.use(bodyParser.json());

const URL = process.env.MONGODB_URL;

mongoose.connect(URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("Mongodb connection success!");
});

const userRouter = require("./routes/users.js");
app.use("/user", userRouter);

const movieRouter = require("./routes/movies.js");
app.use("/movie", movieRouter);


app.listen(PORT, () => {
  console.log("Server is up and running on port number: ${PORT}");
});
