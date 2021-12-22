import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';

import Navigation from 'components/Navigation';
import { User } from 'firebase/auth';

type Props = {
  userObj: User | null,
}

function AppRouter({
  userObj
}: Props) {
  return (
    <HashRouter>
      <Navigation />
      <Routes>
        <Route path="/">
        {userObj ? (
          <>
            <Route index element={<Home userObj={userObj} />} />
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