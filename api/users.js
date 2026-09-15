import axiosClient from "./axiosClient";

export async function fetchUsers(page, limit) {
  const skip = (page - 1) * limit;

  try {
    const response = await axiosClient.get("/users", {
      params: { limit, skip },
    });
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while fetching users");
  }
}

export async function fetchUsersRaw(skip, limit) {
  try {
    const response = await axiosClient.get("/users", {
      params: { limit, skip },
    });
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while fetching users");
  }
}

export async function searchUsers(query, page, limit) {
  const skip = (page - 1) * limit;

  try {
    const response = await axiosClient.get("/users/search", {
      params: { q: query, limit, skip },
    });
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while searching users");
  }
}

export async function fetchUserById(id) {
  try {
    const response = await axiosClient.get(`/users/${id}`);
    return response?.data;
  } catch (err) {
    throw new Error("Could not find this user");
  }
}

export async function createUser(data) {
  try {
    const response = await axiosClient.post("/users/add", data);
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while adding the user");
  }
}

export async function updateUser(id, data) {
  try {
    const response = await axiosClient.patch(`/users/${id}`, data);
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while updating the user");
  }
}

export async function deleteUser(id) {
  try {
    const response = await axiosClient.delete(`/users/${id}`);
    return response?.data;
  } catch (err) {
    throw new Error("Something went wrong while deleting the user");
  }
}