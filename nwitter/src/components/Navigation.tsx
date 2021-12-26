import React, { useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

type Props = {
  userObj: User | null,
}

function Navigation({
  userObj,
}: Props) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">{userObj?.displayName || '나'}의 Profile</Link>
      </li>
    </ul>
  );
};

export default Navigation;