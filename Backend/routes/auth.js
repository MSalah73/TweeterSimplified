const express = require("express");
const router = express.Router();
// const Users = require("../model/User");

// router.get("/register", (req, res) => {
//   res.render("auth/register");
// });

// router.post("/register", (req, res) => {
//   console.log(req.body);
//   let user = new User({
//     username: req.body.display_name,
//     password: req.body.password
//   });

//   user
//     .save()
//     .then(() => {
//       res.redirect("/auth/login");
//     })
//     .catch(() => {
//       res.redirect("/404");
//     });
// });

// router.get("/login", (req, res) => {
//   res.render("auth/login");
// });
// router.post("/login", (req, res) => {});

// router.get("/user", (req, res) => {
//   User.find().then(user => {
//     console.log(user[0].fullname());
//   });
// });
module.exports = router;
