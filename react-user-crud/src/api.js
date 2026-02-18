const BASE_URL = `${import.meta.env.VITE_API_BASE_URL}/users`;
const IS_PROD = import.meta.env.PROD;

export const getUsers = async () => {
  if (IS_PROD) {
    return []; // no backend in production
  }

  const res = await fetch(BASE_URL);
  if (!res.ok) throw new Error("Failed to fetch users");
  return res.json();
};

export const addUser = async (user) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to add user");
  return res.json();
};

export const updateUser = async (id, user) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  });
  if (!res.ok) throw new Error("Failed to update user");
  return res.json();
};

export const deleteUser = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`, {
    method: "DELETE"
  });
  if (!res.ok) throw new Error("Failed to delete user");
};
