const passport = require("passport"); // importing passport
const googleStrategy = require("passport-google-oauth20"); // importing the google strategy
var GitHubStrategy = require("passport-github").Strategy; // importing the github strategy
var localStrategy = require("passport-local").Strategy; // importing passport local
const keys = require("./Keys"); // importing the keys
const User = require("../Models/user.model"); // importing the user model
var bcrypt = require("bcryptjs"); // importing bcrypt for password encryption

// Serializing user
passport.serializeUser((user, done) => {
    done(null, user.id);
});
// Deserializing user
passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

// Configuring local passport stategy
passport.use(
    new localStrategy(
        {
            usernameField: "email",
            passwordField: "password",
        },
        (email, password, done) => {
            User.findOne({ email: email }, (err, user) => {
                if (err) throw err;
                if (!user) return done(null, false);
                bcrypt.compare(password, user.password, function (err, res) {
                    if (err) throw err;
                    if (res === true) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                });
            });
        }
    )
);

// Configuring Google passport stategy
passport.use(
    new googleStrategy(
        {
            callbackURL: "/google-sign-in/redirect",
            clientID: keys.google.clientID,
            clientSecret: keys.google.clientSecret,
        },

        (accessToken, refreshToken, profile, done) => {
            console.log(profile);
            User.findOne({ email: profile.emails[0].value }).then((currentUser) => {
                if (currentUser) {
                    // If we have this user in our database
                    console.log("Existing Google User " + currentUser);
                    done(null, currentUser);
                } else {
                    // If the user is not saved in database so we save the new user
                    new User({
                        name: profile.displayName,
                        email: profile.emails[0].value,
                        password: profile.id,
                    })
                        .save()
                        .then((user) => {
                            console.log("Google new User " + user);
                            done(null, user);
                        });
                }
            });
        }
    )
);

// Configuring Github passport stategy
passport.use(
    new GitHubStrategy(
        {
            clientID: keys.github.clientID,
            clientSecret: keys.github.clientSecret,
            callbackURL: "http://localhost:5000/github-sign-in/redirect",
        },
        function (accessToken, refreshToken, profile, done) {
            console.log(profile);
            User.findOne({ githubId: profile.id }).then((currentUser) => {
                if (currentUser) {
                    // If we have this user in our database
                    console.log("Existing Github User " + currentUser);
                    done(null, currentUser);
                } else {
                    // If the user is not saved in database so we save the new user
                    new User({
                        name: profile._json.login,
                        email: profile._json.login,
                        password: profile._json.node_id,
                        githubId: profile._json.id,
                    })
                        .save()
                        .then((user) => {
                            console.log("Github new User " + user);
                            done(null, user);
                        });
                }
            });
        }
    )
);
