import React, { useEffect, useState } from 'react';

import AppRouter from 'components/AppRouter';

import { authService } from 'firebaseInstance';
import { reauthenticateWithRedirect } from 'firebase/auth';

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState<User | null>(null);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChanged(authService.auth, (firebaseUser) => {
      if (!firebaseUser) {
        return setUserObj(null);
      }

      const user: User = {
        uid: firebaseUser.uid,
        displayName: firebaseUser.displayName,
      };

      setUserObj(user);
      setInit(true);
    });
    return unsubscribe;
  }, []);

  const refreshUser = () => {
    if (!authService.auth.currentUser) {
      return;
    }

    const user: User = {
      uid: authService.auth.currentUser.uid,
      displayName: authService.auth.currentUser.displayName,
    };

    setUserObj(user);
  };

  if (!init) {
    return <span>Initalizing..</span>;
  }

  return (
    <>
      <AppRouter userObj={userObj} refreshUser={refreshUser} />
    </>
  );
}

export default App;
