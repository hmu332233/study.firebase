import React, { useState } from 'react';

import AppRouter from 'components/AppRouter';

import { authService } from 'firebaseInstance';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(Boolean(authService.currentUser));
  return (
    <AppRouter isLoggedIn={isLoggedIn} />
  );
}

export default App;
