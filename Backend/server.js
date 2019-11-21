const express = require("express");
const app = express();
// const methodOverride = require('method_override');
const mongoose = require("mongoose");
const dotenv = require("dotenv/config");
const ejsLayouts = require("express-ejs-layouts");
const session = require("express-session");
const passport = require('passport');//after you session 
const jwt = require('jsonwebtoken');
const mongooseConnect = require('./helper/mongodb')

//Routes includes
const tweetsRoutes = require("./routes/tweets");
const authRoutes = require("./routes/auth");


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
mongoose.set('useCreateIndex', true);
app.set("view engine", "ejs");
app.use(ejsLayouts);
// app.use(methodOverride('_method'));


mongoose.connect(
  process.env.DEV_DB,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("connected to mongoDB");
  }
);


//create session for passport
app.use(session({
 secret : "test",
 resave : false,
 saveUninitialized : true
}))
app.use("/auth", authRoutes);
app.use('/tweets', passport.authenticate('jwt', {session: false}), require('./routes/tweets'))
//passport ininitalied after you session is a must
app.use(passport.initialize());
app.use(passport.session());

app.use("/tweets", tweetsRoutes);

app.get("*", (req, res) => {
  res.render("404");
});

app.listen(5100, () => console.log("express running"));
