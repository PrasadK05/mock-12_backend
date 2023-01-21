require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const {
  createUser,
  validateUser,
  findUser,
} = require("../controllers/user.controllers");
const User = require("../models/user.model");

const token_secret = process.env.TOKEN_KEY;
const refreshToken_secret = process.env.REFRESHTOKEN_KEY;

const app = express.Router();

app.post("/register", async (req, res) => {
  let { email, password, name } = req.body;
  let user = await createUser({ email, password, name });
  if (user) {
    return res.send({ status: true, messege: "user created successfully" });
  } else {
    return res.send({ status: false, messege: "wrong details" });
  }
});

app.post("/login", async (req, res) => {
  let { email, password } = req.body;

  let user = await validateUser({ email, password });
  if (user) {
    let token = jwt.sign({ email: user.email, name: user.name }, token_secret, {
      expiresIn: "24 hr",
    });
    let refreshToken = jwt.sign(
      { email: user.email, name: user.name },
      refreshToken_secret,
      {
        expiresIn: "7 days",
      }
    );

    return res.send({ status: true, token, refreshToken });
  } else {
    return res.send({ status: false, messege: "wrong details" });
  }
});

app.post("/getUser", async (req, res) => {
  let { email } = req.body;
  let user = await findUser(email);

  if (user) {
    return res.send(user);
  } else {
    return res.send({ messege: "user not found" });
  }
});

module.exports = app;
