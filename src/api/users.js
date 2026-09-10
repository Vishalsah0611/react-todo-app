const BASE_URL = "https://dummyjson.com/users";

export async function fetchUsers(page, limit) {
  const skip = (page - 1) * limit;

  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching users");
  }

  return response.json();
}
