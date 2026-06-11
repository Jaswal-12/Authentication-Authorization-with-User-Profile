import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api/users",
  withCredentials: true,
});

export const signupUser = async (userData) => {
  const res = await API.post("/signup", userData);
  return res.data;
};

export const loginUser = async (userData) => {
  const res = await API.post("/login", userData);
  return res.data;
};