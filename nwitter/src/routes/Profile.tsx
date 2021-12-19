import React from 'react';

import { useNavigate } from 'react-router-dom';
import { authService } from 'firebaseInstance';

function Profile() {
  let navigate = useNavigate();
  
  const handleClick = () => {
    authService.signOut(authService.auth);
    navigate('/', { replace: true });
  }
  return (
    <div>
      <span>Profile</span>
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
};
export default Profile;