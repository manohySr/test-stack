const uri = "http://localhost:5000/v1/graphql";

const graphqlFetch = async (query, variables = {}) => {
  try {
    const response = await fetch(uri, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ query, variables }),
    });

    if (!response.ok) {
      throw new Error(`GraphQL request failed: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error during GraphQL fetch:", error);
    throw error;
  }
};

export default graphqlFetch;
