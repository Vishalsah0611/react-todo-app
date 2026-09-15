import axios from "axios";

const BASE_URL = "https://dummyjson.com/users";

export async function fetchUsers(page, limit) {
  const skip = (page - 1) * limit;

  const response = await axios.get(BASE_URL, {
    params: { limit, skip },
  });

  return response?.data;
}

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

export async function fetchAllUsersRaw() {
  const response = await axios.get(BASE_URL, {
    params: { limit: 0 },
  });

  return response?.data;
}

export async function fetchUserById(id) {
  const response = await axios.get(`${BASE_URL}/${id}`);
  return response?.data;
}

export async function createUser(data) {
  const response = await axios.post(`${BASE_URL}/add`, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response?.data;
}

export async function updateUser(id, data) {
  const response = await axios.patch(`${BASE_URL}/${id}`, data, {
    headers: { "Content-Type": "application/json" },
  });

  return response?.data;
}

export async function deleteUser(id) {
  const response = await axios.delete(`${BASE_URL}/${id}`);
  return response?.data;
}