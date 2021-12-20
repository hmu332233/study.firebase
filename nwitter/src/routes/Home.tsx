import React from 'react';

import { dbService } from '../firebaseInstance';

function Home() {
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
    </div>
  );
};
export default Home;