const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const tweetSchema = new Schema(
  {
    tweetBody: {
      type: String,
      required: true
    },
    createdBy: [
      {
        type: Schema.Types.ObjectId,
        ref: "Users"
      }
    ]
  },
  { timestamps: true }
);

const Tweets = mongoose.model("Tweets", tweetSchema);
module.exports = Tweets;