const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: String,
    email: String,
    history: [{
      date: String,
      timeChunks: [{}],
    }],
  },
  { collection: "users", typeKey: "$type" }
);

const User = mongoose.model("User", userSchema);

module.exports = { User };