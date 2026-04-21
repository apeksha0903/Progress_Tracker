const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_count: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);