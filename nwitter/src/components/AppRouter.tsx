import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Auth from '../routes/Auth';
import Home from '../routes/Home';

type Props = {
  isLoggedIn: boolean
}

function AppRouter({
  isLoggedIn
}: Props) {
  return (
    <HashRouter>
      <Routes>
        {isLoggedIn ? (
          <Route path="/" element={<Home />} />
        ) : (
          <Route path="/" element={<Auth />} />
        )}
      </Routes>
    </HashRouter>
  );
};

export default AppRouter;