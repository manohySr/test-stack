const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true, // Ensure that the 'id' is unique
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "",
    },
    completed: {
      type: Boolean,
      required: true,
      default: false,
    },
    priority: {
      type: String,
      required: true,
      enum: ["low", "medium", "high"],
    },
  },
  {
    timestamps: true, // Automatically manage createdAt and updatedAt fields
  },
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
