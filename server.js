require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

const app = express();

var corsOptions = {
  origin: "http://localhost:3000",
};

app.use(cors(corsOptions));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

const db = require("./models");
const dbConfig = require("./config/db.config");

const url = `mongodb://${dbConfig.DB_USER}:${dbConfig.DB_PASSWORD}@${dbConfig.DB_HOST}:${dbConfig.DB_PORT}/${dbConfig.DB_NAME}?authSource=admin`;

db.mongoose
  .connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "App running" });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
