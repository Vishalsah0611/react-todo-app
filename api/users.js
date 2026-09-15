import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

// GET — list of users (used by the table, with pagination)
export async function fetchUsers(page, limit) {
  const skip = (page - 1) * limit;

  const response = await axios.get(BASE_URL, {
    params: { limit, skip },
  });

  return response?.data;
}

// GET — used internally to fetch a specific slice by exact skip value
// (useful for "backfilling" one extra user after a delete)
export async function fetchUsersRaw(skip, limit) {
  const response = await axios.get(BASE_URL, {
    params: { limit, skip },
  });

  return response?.data;
}
export async function searchUsers(query, page, limit) {
  const skip = (page - 1) * limit;

  const response = await axios.get(`${BASE_URL}/search`, {
    params: { q: query, limit, skip },
  });

  return response?.data;
}

// GET — a single user by id (used by the View page and to pre-fill the Edit form)
export async function fetchUserById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response?.data;
}

// POST — create a new user
export async function createUser(data) {
  const response = await axios.post(`${BASE_URL}/add`, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response?.data;
}

// PATCH — update an existing user
export async function updateUser(id, data) {
  const response = await axios.patch(`${BASE_URL}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response?.data;
}

// DELETE — remove a user
export async function deleteUser(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response?.data;
}
