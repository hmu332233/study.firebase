import React, { useEffect } from 'react';

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
  return (
    <div>
      <span>Profile</span>
      <button onClick={handleClick}>Log Out</button>
    </div>
  );
};
export default Profile;