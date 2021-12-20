import React, { useEffect, useState } from 'react';

import { dbService } from '../firebaseInstance';

type Nweet = {
  id: string,
  contents: string,
  createdAt: number,
}

function Home() {
  const [nweets, setNweets] = useState<Array<Nweet>>([]);
  const getNweets = async () => {
    const querySnapshot = await dbService.getDocs(dbService.collection(dbService.db, 'nweets'));
    querySnapshot.forEach((doc) => {
      setNweets(prev => {
        const nweet: Nweet = {
          ...doc.data() as Nweet,
          id: doc.id,
        };
        return [nweet, ...prev];
      })
    });
  }

  useEffect(() => {
    getNweets();
  }, []);

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { contents } = Object.fromEntries(formData);

    const docRef = await dbService.addDoc(
      dbService.collection(dbService.db, 'nweets'), 
      {
        contents,
        createdAt: Date.now(),
      }
    );

    formElement.reset();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="contents" maxLength={120} placeholder="What's on your mind?" />
        <button type="submit">Nweet</button>
      </form>
      <div>
        {nweets.map(nweet => (
          <div key={nweet.id}>
            <h4>{nweet.contents}</h4>
          </div>
        ))}
      </div>
    </div>
  );
};
export default Home;