const Task = require("./tasks.mongo.js");
async function findAllTask(priority, completed) {
  try {
    // Filter depending on the args
    let filter = {};

    if (priority) {
      filter.priority = priority;
    }

    if (completed !== undefined) {
      filter.completed = completed;
    }

    console.log("Filter:", filter);

    // Fetch tasks based on the filter
    const tasks = await Task.find(filter, {
      _id: 0,
      __v: 0,
    });

    return tasks;
  } catch (error) {
    console.error("Error finding tasks:", error);
    throw new Error("Failed to fetch tasks. Please try again.");
  }
}
async function findTaskById(id) {
  try {
    // Perform the query to find a task with the provided id
    const task = await Task.findOne(
      { id },
      {
        _id: 0,
        __v: 0,
      },
    );

    if (!task) {
      throw new Error("Task not found");
    }

    console.log(task);
    return task;
  } catch (error) {
    console.error("Error finding task by ID:", error);
    throw new Error("Failed to find task by custom ID");
  }
}
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
