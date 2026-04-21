const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    task_name: {
      type: String,
      required: true,
      trim: true,
    },
    task_start_date: {
      type: Date,
      required: true,
    },
    task_due_date: {
      type: Date,
      required: true,
    },
    task_status: {
      type: String,
      enum: ["pending", "in-progress", "completed"],
      default: "pending",
    },

    // relation to user
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);