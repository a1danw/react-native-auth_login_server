const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
require("dotenv").config();

// parses the body of the requests
app.use(express.json());

const authRoutes = require("./routes/auth");
const verifyToken = require("./routes/verifyToken");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome to the auth system");
});

app.get("/api/user/profile", verifyToken, (req, res) => {
  console.log(req.user);
  res.send({ success: true, data: req.user });
});

app.use("/api/users", authRoutes);

// app.listen(3000, () => console.log("Server is runnng"));
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@react-native-home-listi.jxp9z.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => {
    app.listen(3000, () => console.log("Server is running"));
  })
  .catch((err) => console.log(err));
