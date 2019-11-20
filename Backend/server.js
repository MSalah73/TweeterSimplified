const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require('passport');//after you session 

//Routes
const tweetsRoutes = require("./routes/tweets");
const authRoutes = require("./routes/auth");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set('useCreateIndex', true)
app.set("view engine", "ejs");
app.use(ejsLayouts);

mongoose.connect(
  process.env.DEV_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoDB");
  }
);

app.use("/tweets", tweetRoutes);
app.use("/auth", authRoutes);
app.use(session({
	secret: process.env.SECRET,
	resave:false,
	saveUninitialized: true
}));
//passport ininitalied after you session is a must
app.use(passport.initialize());
app.use(passport.session());

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(5100, () => console.log("express running"));
