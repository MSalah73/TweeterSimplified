const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt");
const saltRounds = 10;

const userSchema = new Schema(
  {
    firstname: String,
    lastname: String,
    username: {
      type: String,
      required: true
    },
    password: String,
    email: {
      type: String,
      unique: true
    }
  },
  { timestamps: true }
);

userSchema.pre("save", function(next) {
  let user = this;
  if (user.password && user.isModified()) {
    bcrypt
      .hash(user.password, saltRounds)
      .then(function(hash) {
        user.password = hash;
        next();
      })
      .catch(err => console.log(err));
  }
});

userSchema.method.verifyPassword = (password, hash, next) => {
  bcrypt.compare(password, hash, function(err, res) {
    if (err) {
      return next(err);
    }
    return next(null, res);
  });
};

const Users = mongoose.model("Users", userSchema);
module.exports = Users;
