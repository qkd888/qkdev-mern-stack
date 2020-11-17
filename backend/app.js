var express = require("express"); //  Requiring express

var cookieParser = require("cookie-parser"); // Requiring cookieParser
var logger = require("morgan"); // Requiring logger

var authRoutes = require("./routes/auth.routes"); // Requiring auth routes
var eventRoutes = require("./routes/event.routes"); //  Requiring event routes

var mongoose = require("mongoose");
const passportSetup = require("./Config/Passport"); // Requiring passport setup
const keys = require("./config/Keys"); // Requiring keys
const passport = require("passport"); //  Requiring passport
const cors = require("cors"); //  Requiring cors
var session = require("express-session"); // Requiring express session
const cookieSession = require("cookie-session"); //  Requiring cookie session
const helmet = require("helmet"); //  Requiring helmet

var app = express();

var path = require("path");
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Middleware
app.use(
  cookieSession({ maxAge: 24 * 60 * 60 * 1000, keys: [keys.session.cookieKey] })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  })
);
app.use(
  cors({
    origin: "http://localhost:3000/",
    methods: "GET,HEAD,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(helmet());
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/", authRoutes);
app.use("/", eventRoutes);

// Database connection
mongoose.connect(
  keys.mongoDB.dbURI,
  {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to MongoDb");
  }
);

module.exports = app;
