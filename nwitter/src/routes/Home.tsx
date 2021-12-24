import { User } from '@firebase/auth';
import Nweet from 'components/Nweet';
import React, { useEffect, useState } from 'react';

import { dbService } from '../firebaseInstance';

type Props = {
  userObj: User,
}

function Home({
  userObj,
}: Props) {
  const [nweets, setNweets] = useState<Array<Nweet>>([]);
  const [attachment, setAttachment] = useState<string | null>();

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

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { contents } = Object.fromEntries(formData);

    const docRef = await dbService.addDoc(
      dbService.collection(dbService.db, 'nweets'), 
      {
        creatorId: userObj.uid,
        contents,
        createdAt: Date.now(),
      }
    );

    formElement.reset();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // event.target.files;
    const { target: { files }} = event;
    if (!files) {
      return;
    }

    const file = files[0];
    const fileReader = new FileReader();
    fileReader.onloadend = (progressEvent) => {
      if (!progressEvent.target) {
        return;
      }
      const { result } = progressEvent.target;
      setAttachment(result as string);
      
    };
    fileReader.readAsDataURL(file);

    // 아래와 같이 하는 것도 가능
    // URL.createObjectURL(file);
  };

  const clearAttachment = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAttachment(null);
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="contents" maxLength={120} placeholder="What's on your mind?" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button type="submit">Nweet</button>
        {attachment && (
          <div>
            <img src={attachment} width={50} height={50} alt="preview" />
            <button type="button" onClick={clearAttachment}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet key={nweet.id} nweet={nweet} isOwner={nweet.creatorId === userObj.uid} />
        ))}
      </div>
    </div>
  );
};
export default Home;