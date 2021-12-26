import React, { useEffect, useState } from 'react';

import { useNavigate } from 'react-router-dom';
import { authService, dbService } from 'firebaseInstance';
import { User } from 'firebase/auth';

type Props = {
  userObj: User,
};

function Profile({
  userObj,
}: Props) {
  let navigate = useNavigate();
  
  const getMyNweets = async () => {
    const q = dbService.query(dbService.collection(dbService.db, 'nweets'), dbService.where('creatorId', '==', userObj.uid), dbService.orderBy('createdAt', 'desc'));

    const querySnapshot = await dbService.getDocs(q);
    const nweets = querySnapshot.docs.map(doc => doc.data());
    console.log(nweets);
  };

  useEffect(() => {
    getMyNweets();
  }, []);

  const handleClick = () => {
    authService.signOut(authService.auth);
    navigate('/', { replace: true });
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { name } = Object.fromEntries(formData);

    await authService.updateProfile(userObj, {
      displayName: name as string,
    });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="name" placeholder="Display name" />
        <button type="submit">Update Profile</button>
      </form>
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
};
export default Profile;