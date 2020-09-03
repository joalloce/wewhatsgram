const User = require('../models/User')
const jwt = require('jsonwebtoken');

//todo:token
module.exports.signup_post = async (req,res) => {
  const{username,email,password} = req.body;
  try {
    const user = await User.create({username,email,password});
    res.status(201).json({user: user._id})
  }catch(err) {
    res.status(400).json(err)
  }
}
//todo: token
module.exports.login_post = async (req,res) => {
  const{email,password} = req.body;
  try {
    const user = await User.login(email,password)
    res.status(200).json({user:user._id})
  }catch(err) {
    res.status(400).json(err)
  }
}

//todo
module.exports.logout_get = (req,res) => {
  res.send('hello')
}