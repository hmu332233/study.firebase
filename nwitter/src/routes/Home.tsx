import Nweet from 'components/Nweet';
import React, { useEffect, useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { dbService } from '../firebaseInstance';

import NweetFactory from 'components/NweetFactory';

type Props = {
  userObj: User,
}

function Home({
  userObj,
}: Props) {
  const [nweets, setNweets] = useState<Array<Nweet>>([]);
  

  useEffect(() => {
    dbService.onSnapshot(dbService.collection(dbService.db, 'nweets'), (snapshot) => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Array<Nweet>;
      
      setNweets(nweetArray);
      console.log(snapshot.docs);
    });
  }, []);


  return (
    <div>
      <NweetFactory userObj={userObj} />
      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweet={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;