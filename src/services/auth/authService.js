import axiosInstance from "@libs/helpers/axiosInstance";

export const registerUser = async (data) => {
  const response = await axiosInstance.post("/users", data);
  return response.data;
};

export const loginUser = async (credentials) => {
  const res = await axiosInstance.post(`/logIn`, credentials);
  const { token, user } = res.data;
  localStorage.setItem('user_studify', JSON.stringify(user));
  localStorage.setItem('token_studify', token);

  return res.data;

};