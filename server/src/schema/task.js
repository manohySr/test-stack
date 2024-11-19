const { makeExecutableSchema } = require("@graphql-tools/schema");
const { randomUUID } = require("crypto");
const {
  findAllTask,
  createTask,
  findTaskById,
  updateTaskById,
  deleteTaskById,
} = require("./../models/tasks.model.js");

function ErrorIfNotValidPriority(priority) {
  const validPriorities = ["low", "medium", "high"];
  if (!validPriorities.includes(priority)) {
    throw new Error("Invalid priority value");
  }
}

const typeDefs = `#graphql
  type Task {
    id: ID!
    title: String!
    description: String
    completed: Boolean!
    priority: String!
  }

  type Query {
    getTasks(priority: String, completed: Boolean): [Task]
    getTaskById(id: ID!): Task
  }

  type Mutation {
    addTask(title: String!, priority: String!, description: String): Task
    toggleTaskCompletion(id: ID!): Task
    updateTask(
      id: ID!
      title: String
      priority: String
      completed: Boolean
      description: String
    ): Task
    deleteTask(id: ID!): String
  }
`;

const resolvers = {
  Query: {
    getTasks: async (_, { priority, completed }) => {
      if (priority) {
        ErrorIfNotValidPriority(priority);
      }
      return await findAllTask(priority, completed);
    },

    getTaskById: (_, { id }) => {
      return findTaskById(String(id));
    },
  },

  Mutation: {
    addTask: async (_, { title, priority, description }) => {
      ErrorIfNotValidPriority(priority);
      const newTask = {
        id: String(randomUUID()),
        title,
        description: description || null,
        completed: false,
        priority,
      };

      try {
        const task = await createTask(newTask);
        return task;
      } catch (error) {
        console.error("Error adding task:", error);
        throw new Error("Failed to add task. Please try again.");
      }
    },

    updateTask: async (_, { id, title, priority, completed, description }) => {
      try {
        const updateData = {};

        if (title) updateData.title = title;
        if (priority) updateData.priority = priority;
        if (completed !== undefined) updateData.completed = completed;
        if (description) updateData.description = description;

        // If no fields are provided to update, throw an error
        if (Object.keys(updateData).length === 0) {
          throw new Error("No fields provided for update");
        }

        const updatedTask = await updateTaskById(String(id), updateData);
        return updatedTask;
      } catch (error) {
        console.error("Error updating task:", error);
        throw new Error("Failed to update task. Please try again.");
      }
    },

    deleteTask: async (_, { id }) => {
      try {
        const deletionResult = await deleteTaskById(String(id));
        return deletionResult;
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Failed to delete task. Please try again.");
      }
    },
  },
};

const taskSchema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = taskSchema;
