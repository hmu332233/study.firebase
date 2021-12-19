import React, { useEffect, useState } from 'react';

import AppRouter from 'components/AppRouter';

import { authService } from 'firebaseInstance';

function App() {
  const [init, setInit] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authService.auth.currentUser));

  useEffect(() => {
    authService.onAuthStateChanged(authService.auth, (user) => {
      setIsLoggedIn(Boolean(user));
      setInit(true);
    });
  }, []);


  return (
    init ? <AppRouter isLoggedIn={isLoggedIn} /> : <span>Initalizing..</span>
  );
}

export default App;
