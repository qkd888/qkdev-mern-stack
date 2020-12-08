var express = require("express"); // importing express
const passport = require("passport"); // importing passport
var router = express.Router(); // importing router
const CLIENT_UPDATE_PROFILE = "http://localhost:3000/signin"; // Declaring redirect url for succesful google/github sign in

const {
  signUpUser,
  signInUser,
  signOutUser,
  updateProfile,
} = require("../controllers/auth.controllers"); // Destrucuring controllers
const { response } = require("express");

router.post("/sign-in", signInUser); // User sign in route
router.post("/sign-up", signUpUser); // User sign up route
router.put("/update-profile/:id", updateProfile); // // user profile update route
router.get("/sign-out", signOutUser); // user sign out route

// Google sign in route
router.get(
  "/google-sign-in",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google sign in redirect route
router.get(
  "/google-sign-in/redirect",
  passport.authenticate("google", {
    successRedirect: CLIENT_UPDATE_PROFILE,
    failureRedirect: "/sign-in/failed",
  })
);

// Github sign in route
router.get("/github-sign-in", passport.authenticate("github"));

// Github sign in redirect route
router.get(
  "/github-sign-in/redirect",
  passport.authenticate("github", {
    successRedirect: CLIENT_UPDATE_PROFILE,
    failureRedirect: "/sign-in/failed",
  })
);

// Google/Github sign in failure route
router.get("/sign-in/failed", (req, res) => {
  res.status(401).json({
    success: false,
    message: "User failed to authenticate.",
  });
});

// Get signed in user route
router.get("/user", (req, res) => {
  if (req.user) {
    res.json({ status: 200, user: req.user });
  } else {
    res.json({ status: 400, message: "No user" });
  }
});

module.exports = router;
