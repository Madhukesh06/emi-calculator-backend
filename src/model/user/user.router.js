const express = require("express");
const User = require("./user.schema");
const app = express();

// Register API

app.post("/register", async (req, res) => {
  const body = req.body;
  try {
    let user = await User.findOne({ email: body.email });
    console.log(user);
    if (!user) {
      user = new User(body);
      user.save();
      res.send({ message: "User created successfully", data: user });
      return;
    } else {
      res.send({ message: "user Already exist" });
    }
  } catch (error) {
    res.send(error);
  }
});

// Login API
app.post("/login", async (req, res) => {
  const body = req.body;
  try {
    let user = await User.findOne({
      email: body.email,
      password: body.password,
    });
    if (!user) {
      res.send({ message: "User not found" });
    } else {
      res.send({
        message: "User logged in successfully",
        data: user,
        token: `${user.email}:${user.password}:${user.name}`,
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

// Get User Profile API

app.get("/getprofile", async (req, res) => {
  try {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
      res.send({ message: "User not found" });
    } else {
      res.send({
        message: "User profile found",
        data: user,
      });
    }
  } catch (error) {
    res.send({ error: error });
  }
});

// Logout API
app.get("/logout", (req, res) => {
  const { _id } = req.query;
  User.findOneAndRemove({ email: _id });
});

module.exports = app;
