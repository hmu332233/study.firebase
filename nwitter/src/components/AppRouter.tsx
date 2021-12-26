import React, { useState } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import Profile from 'routes/Profile';
import Auth from 'routes/Auth';
import Home from 'routes/Home';

import Navigation from 'components/Navigation';

type Props = {
  userObj: User | null,
  refreshUser: () => void,
}

function AppRouter({
  userObj,
  refreshUser,
}: Props) {
  return (
    <HashRouter>
      <Navigation userObj={userObj} />
      <Routes>
        <Route path="/">
        {userObj ? (
          <>
            <Route index element={<Home userObj={userObj} />} />
            <Route path="/profile" element={<Profile userObj={userObj} refreshUser={refreshUser} />} />
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