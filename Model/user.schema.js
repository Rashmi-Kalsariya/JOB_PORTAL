const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    number: Number,
    role: {
      type: String,
      enum: ["MAIN", "HR", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
    profile: String,
    resume: String,
    city: String,
    country: String,
    experience: {
      type: String,
      enum: ["Fresher", "1", "2", "3", "4", "5", ">/5"],
      default: "Fresher",
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;
