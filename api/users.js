const BASE_URL = "https://dummyjson.com/users";

export async function fetchUsers(page, limit) {
  const skip = (page - 1) * limit;
  const response = await fetch(`${BASE_URL}?limit=${limit}&skip=${skip}`);

  if (!response.ok) {
    throw new Error("Something went wrong while fetching users");
  }

  return response.json();
}


export async function fetchUserById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Failed to fetch user details");
  }

  return response.json();
}


export async function createUser(data) {
  const response = await fetch(`${BASE_URL}/add`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to add user");
  }

  return response.json();
}

export async function updateUser(id, data) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error("Failed to update user");
  }

  return response.json();
}

export async function deleteUser(id) {
  const response = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error("Failed to delete user");
  }

  return response.json();
}
