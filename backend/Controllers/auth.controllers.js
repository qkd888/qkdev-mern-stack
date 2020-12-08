const mongoose = require("mongoose");
const User = require("../Models/user.model");
var bcrypt = require("bcryptjs");
const passport = require("passport");

// ------------ Sign Up A New User Locally ----------- //

const signUpUser = (req, res) => {
  const { name, email, password } = req.body;

  User.findOne({ email }).exec((err, user) => {
    if (user) {
      console.log("user exists");
      return res.json({
        status: 400,
        message: "User already exists",
      });
    } else {
      bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(password, salt, function (err, hashedPassword) {
          const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword,
          });
          newUser.save(function (err, data) {
            if (err) {
              console.log(err);
              res.status(500).send({
                message: "Some error occurred while adding a new user.",
              });
            } else {
              console.log(data);
              console.log("A new user has been added to the database");
              res.json({
                status: 201,
                message: "User created succesfully! Please signin",
              });
            }
          });
        });
      });
    }
  });
};

// ------------ Sign In A New User Locally ----------- //
const signInUser = (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) {
      res.json({
        status: 400,
        message: "User does not exists or Incorrect password",
      });
    } else {
      req.logIn(user, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(` This is a login user ${user}`);
        res.json({ status: 200, user: user });
      });
    }
  })(req, res, next);
};

const updateProfile = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  User.findOneAndUpdate(
    { _id: id },
    {
      name: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
    },
    { new: true },
    function (err, doc) {
      if (err) {
        console.log("Something wrong when updating profile!");
        res.json({
          status: 400,
          message: "Something wrong when updating profile!",
        });
      } else {
        res.json({ status: 200, user: doc });
      }
    }
  );
};

const signOutUser = (req, res) => {
  req.logout();
  res.json("logged out");
};

module.exports = {
  signUpUser,
  signInUser,
  signOutUser,
  updateProfile,
};
