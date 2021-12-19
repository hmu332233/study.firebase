import React, { useState } from 'react';
import { HashRouter, Link, Route, Routes } from 'react-router-dom';

type Props = {}

function Navigation({}: Props) {
  return (
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/profile">My Profile</Link>
      </li>
    </ul>
  );
};

export default Navigation;