import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';

import Navigation from 'components/Navigation';

type Props = {
  isLoggedIn: boolean
}

function AppRouter({
  isLoggedIn
}: Props) {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/">
        {isLoggedIn ? (
          <>
            <Route index element={<Home />} />
            <Route path="/profile" element={<Profile />} />
          </>
        ) : (
          <>
            <Route index element={<Auth />} />
          </>
        )}
        </Route>
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;