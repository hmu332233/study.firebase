import React, { useEffect, useState } from 'react';

import AppRouter from 'components/AppRouter';

import { authService } from 'firebaseInstance';
import { User } from '@firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  // const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authService.auth.currentUser));
  const [userObj, setUserObj] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(authService.auth, (user) => {
      // setIsLoggedIn(Boolean(user));
      setUserObj(user as User);
      setInit(true);
    });
    return unsubscribe;
  }, []);

  if (!init) {
    return <span>Initalizing..</span>;
  }

  return (
    <>
      <AppRouter userObj={userObj} />
    </>
  );
}

export default App;
