const BASE_URL = "http://localhost:5000/api/v1";

// LOGOUT
export const logoutUser = async () => {
  await fetch(`${BASE_URL}/auth/logout`, {
    method: "POST",
    credentials: "include",
  });
};

// REGISTER
export const registerUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ add
    body: JSON.stringify(data),
  });
  return res.json();
};

// LOGIN
export const loginUser = async (data) => {
  const res = await fetch(`${BASE_URL}/auth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ add
    body: JSON.stringify(data),
  });
  return res.json();
};

// GET TASKS
export const getTasks = async () => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    credentials: "include", // ✅ REQUIRED
  });
  return res.json();
};

// CREATE TASK
export const createTask = async (data) => {
  const res = await fetch(`${BASE_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // ✅ REQUIRED
    body: JSON.stringify(data),
  });
  return res.json();
};
