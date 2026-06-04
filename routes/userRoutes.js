const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const router = express.Router();

const User = require("../models/User");


// REGISTER USER
router.post("/register", async (req, res) => {

  try {

    const { name, email, password } = req.body;

    // CHECK IF USER EXISTS
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists"
      });
    }

    // CREATE USER
    const user = new User({
      name,
      email,
      password
    });

    await user.save();

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(201).json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});


// LOGIN USER
router.post("/login", async (req, res) => {

  try {

    const { email, password } = req.body;

    // FIND USER
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // CHECK PASSWORD
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // GENERATE TOKEN
    const token = jwt.sign(
      { id: user._id },
      "secretkey",
      { expiresIn: "1d" }
    );

    res.status(200).json({
      token,
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;