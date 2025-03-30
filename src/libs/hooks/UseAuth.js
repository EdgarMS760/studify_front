import React from 'react';

export function useAuth() {
  const [session, setSession] = React.useState({
    user: {
      name: 'Edgar',
      email: 'edgar@mail.com',
      image: 'https://avatars.githubusercontent.com/u/98296966?v=4&size=64',
    },
  });

  const signIn = () => {
    setSession({
      user: {
        name: 'Edgar',
        email: 'edgar@mail.com',
        image: 'https://avatars.githubusercontent.com/u/98296966?v=4&size=64',
      },
    });
  };

  const signOut = () => {
    setSession(null);
  };

  return {
    session,
    authentication: {
      signIn,
      signOut,
    },
  };
}
