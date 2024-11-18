const Task = require("./tasks.mongo.js");
async function createTask(task) {
  try {
    const newTask = await Task.create(task);
    return newTask;
  } catch (error) {
    console.error("Error creating task:", error);
    throw new Error("Failed to create task. Please try again.");
  }
}
module.exports = {
  createTask,
};
