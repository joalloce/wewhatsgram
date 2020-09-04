const User = require("../models/User");
const jwt = require("jsonwebtoken");

//todo:token and handle errors
module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    res.cookie("user", "hola", { httpOnly: true, maxAge: 60 * 60 * 1000 });
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //res.header('Access-Control-Allow-Credentials','true')
    res.status(201).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};
//todo: token and handle errors
module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.cookie("user", "hola", { httpOnly: true, maxAge: 60 * 60 * 1000 });
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //res.header('Access-Control-Allow-Credentials','true')
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const handleErrors = (err) => {
  let errors = { email: "", username: "", password: "" };

  // incorrect email
  if (err.message == "Incorrect email") {
    errors.email = "That email is not registered";
  }

  // incorrect email
  if (err.message == "Incorrect password") {
    errors.password = "That password is incorrect";
  }

  //duplicate error code
  if (err.code == 11000) {
    if (err.keyPattern.username) {
      errors.username = "That username is already registered";
    }
    if (err.keyPattern.email) {
      errors.email = "That email is already registered";
    }
    console.log(err);
    return errors;
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }
  return errors;
};

//todo
module.exports.logout_get = (req, res) => {
  res.send("hello");
};
