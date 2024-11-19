export const getTasksQuery = (priority = null, completed = null) => {
  const filters = [];
  if (priority) filters.push(`priority: "${priority}"`);
  if (typeof completed === "boolean") filters.push(`completed: ${completed}`);
  const filterString = filters.length > 0 ? `(${filters.join(", ")})` : "";

  return `#graphql
    query {
      getTasks${filterString} {
        id
        title
        description
        completed
        priority
      }
    }
  `;
};

export const deleteTaskQuery = (id) => {
  return `#graphql
    mutation {
      deleteTask(id: "${id}")
    }`;
};
