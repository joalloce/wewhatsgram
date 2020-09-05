const User = require("../models/User");
const jwt = require("jsonwebtoken");

const maxAge = 60* 60;
const jwt_secret = "wewhatsgram jwt";

//todo:token and handle errors
module.exports.signup_post = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.create({ username, email, password });
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //res.header('Access-Control-Allow-Credentials','true')
    res.status(201).json({ user: user.username });
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
    const token = createToken(user._id);
    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    //res.header('Access-Control-Allow-Origin', 'http://localhost:3000')
    //res.header('Access-Control-Allow-Credentials','true')
    res.status(200).json({ user: user.username });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, jwt_secret, { expiresIn: maxAge });
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

module.exports.checkuser_get = async (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "wewhatsgram jwt", async (err, decodedToken) => {
      if (err) {
        res.status(200).json({ user: null });
      } else {
        let user = await User.findById(decodedToken.id);
        res.status(200).json({ user });
      }
    });
  } else {
    res.status(200).json({ user: null });
  }
};

module.exports.requireAuth_get = (req, res) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, "wewhatsgram jwt", (err, decodedToken) => {
      if (err) {
        res.status(200).json({ requireAuth: true });
      } else {
        res.status(200).json({ requireAuth: false });
      }
    });
  } else {
    res.status(200).json({ requireAuth: true });
  }
};

module.exports.logout_get = (req, res) => {
  res.cookie("jwt", "", { maxAge: 1 });
  res.status(200).send("user logged out");
};
