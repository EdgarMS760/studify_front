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
    // Intentar login
    const res = await axiosInstance.post(`/logIn`, loginData);
    localStorage.setItem('user_studify', JSON.stringify(res.data.user));
    localStorage.setItem('token_studify', res.data.token);
    return { success: true, user: res.data.user, token: res.data.token };
  } catch (loginError) {
    // Si no existe, retornar los datos base para que se elija el rol antes de registrar
    return {
      success: false,
      userData: {
        nombre: displayName,
        email,
        foto_perfil: photoURL,
        password: firebaseToken,
      },
    };
  }
};

