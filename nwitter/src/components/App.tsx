import React, { useState } from 'react';

import AppRouter from 'components/AppRouter';

import { authService } from 'firebaseInstance';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authService.auth.currentUser));
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
