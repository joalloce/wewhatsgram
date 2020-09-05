const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  username: {
    type: String,
    require: [true, "Please enter a username"],
    unique: true,
    validate: [
      function () {
        return validator.matches(this.username, "^[a-zA-Z0-9_.-]{2,}$");
      },
      "Please enter a valid username",
    ],
  },
  email: {
    type: String,
    require: [true, "Please enter an email"],
    unique: true,
    validate: [validator.isEmail, "Please enter a valid email"],
  },
  password: {
    type: String,
    require: [true, "Please enter a password"],
    minlength: [6, "Mininum password length is 6 characters"],
  },
});

//fire a function to hash password before saving User to db
userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// static method to login user
userSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("Incorrect password");
  }
  throw Error("Incorrect email");
};

const User = mongoose.model("user", userSchema);

module.exports = User;
