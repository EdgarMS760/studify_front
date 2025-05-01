import { useState, useEffect } from 'react';
let externalLoadSession = () => { };
export const useSessionAuth = () => {
  const [session, setSession] = useState(null);

  const loadSession = () => {
    const storedUser = localStorage.getItem('user_studify');
    const storedToken = localStorage.getItem('token_studify');

    if (storedUser && storedToken) {
      const user = JSON.parse(storedUser);
      setSession({
        user: {
          name: user.nombre,
          email: user.email,
          image: user.foto_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}`,
        },
      });
    } else {
      setSession(null);
    }
  };



  const updateSessionFromUser = (user) => {
    setSession({
      user: {
        name: user.nombre,
        email: user.email,
        image: user.foto_perfil || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.nombre)}`,
      },
    });
  };

  const signIn = (userData, token) => {
    localStorage.setItem('user_studify', JSON.stringify(userData));
    localStorage.setItem('token_studify', token);
    loadSession();
  };

  const signOut = () => {
    localStorage.removeItem('user_studify');
    localStorage.removeItem('token_studify');
    setSession(null);
    window.location.reload();
  };

  useEffect(() => {
    loadSession();
    externalLoadSession = loadSession;
  }, []);
  return {
    session,
    updateSessionFromUser,
    authentication: {
      signIn,
      signOut
    }
  };
};
export { externalLoadSession };
