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
export const socialLogin = async (firebaseUser, firebaseToken) => {
  const { displayName, email, photoURL } = firebaseUser;

  const loginData = {
    email,
    password: firebaseToken,
  };

  try {
    // login
    const res = await axiosInstance.post(`/logIn`, loginData);
    localStorage.setItem('user_studify', JSON.stringify(res.data.user));
    localStorage.setItem('token_studify', res.data.token);
    return res.data;
  } catch (err) {
    // 2. Si falla, intentar registro 
    const userData = {
      nombre: displayName,
      email,
      rol: "alumno", //TODO: Cambiar a "alumno" o "maestro" 
      password: firebaseToken,
      foto_perfil: photoURL,
    };

    const res = await axiosInstance.post(`/users`, userData);

    localStorage.setItem('user_studify', JSON.stringify(res.data.user));
    localStorage.setItem('token_studify', res.data.token);
    return res.data;
  }
};
