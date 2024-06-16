const User = require("../models/UserModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Create a new User
exports.createUser = async (req, res) => {
  try {
    if (!req.body.name || req.body.name === "") {
      console.log("name error");
      return res
        .status(400)
        .send({ statusCode: 400, error: "name is required" });
    }
    if (!req.body.email || req.body.email === "") {
      return res
        .status(400)
        .send({ statusCode: 400, error: "email is required" });
    }

    if (!req.body.password || req.body.password === "") {
      return res
        .status(400)
        .send({ statusCode: 400, error: "password is required" });
    }

    const { name, email, password } = req.body;
    let hasPass = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hasPass }); //create User
    res.status(201).send({
      statusCode: 200,
      message: "User created successfully",
      data: user,
    }); //response
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ statusCode: 401, error: "user not found" });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res
        .status(401)
        .json({ statusCode: 401, error: "Incorrect password" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET, {
      expiresIn: "1h",
    });
    res.status(200).json({ token });
  } catch (error) {
    console.log(error);
    res.status(400).json({ statusCode: 400, error: "Login failed" });
  }
};

// Retrieve all Users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // fetch all data
    res.status(200).send({
      statusCode: 200,
      message: "User fetched successfully",
      data: users,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Retrieve a User by its ID
exports.getUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .send({ statusCode: 400, error: "Id nor found or Invalid Id" });
    }

    const user = await User.findById(req.params.id); //fetch data by id
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User fetch successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

// Update a User by its ID
exports.updateUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .send({ statusCode: 400, error: "Id nor found or Invalid Id" });
    }
    let user;

    if (!req.body.password || req.user.password == "") {
      user = await User.findByIdAndUpdate(
        req.params.id,
        { email: req.body.email, name: req.body.name },
        {
          new: true,
          runValidators: true,
        }
      ); // update user without password
    }
    user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }); // update by id
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User updated successfully",
      data: user,
    });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a User by its ID
exports.deleteUserById = async (req, res) => {
  try {
    if (!req.params.id) {
      return res
        .status(400)
        .send({ statusCode: 400, error: "Id nor found or Invalid Id" });
    }

    const user = await User.findByIdAndDelete(req.params.id); // delete by id
    if (!user) {
      return res.status(404).send({ error: "User not found" });
    }
    res.status(200).send({
      statusCode: 200,
      message: "User deleted successfully",
      data: user,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
