import React, { useState } from 'react';

import { v4 as uuidv4 } from 'uuid';

import { dbService, storageService } from '../firebaseInstance';


type Props = {
  userObj: User,
};

function NweetFactory({
  userObj,
}: Props) {
  const [attachment, setAttachment] = useState<{ type: string, data: string }>();
  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    console.log(Object.fromEntries(formData));
    const { contents } = Object.fromEntries(formData);
    let attachmentUrl: string | undefined;

    const fileRef = storageService.ref(storageService.storage, `${userObj.uid}/${uuidv4()}`);
    if (attachment) {
      const fileSnapshot = await storageService.uploadString(fileRef, attachment.data, 'data_url');
      console.log(fileSnapshot);
      attachmentUrl = await storageService.getDownloadURL(fileSnapshot.ref);
    }
    
    const docRef = await dbService.addDoc(
      dbService.collection(dbService.db, 'nweets'), 
      {
        creatorId: userObj.uid,
        contents,
        createdAt: Date.now(),
        attachmentUrl,
      }
    );

    formElement.reset();
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setAttachment({
        type: file.type,
        data: result as string,
      });
      
    };
    fileReader.readAsDataURL(file);

    // 아래와 같이 하는 것도 가능
    // URL.createObjectURL(file);
  };

  const clearAttachment = (event: React.SyntheticEvent) => {
    event.preventDefault();
    setAttachment(undefined);
  }
  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="contents" maxLength={120} placeholder="What's on your mind?" />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button type="submit">Nweet</button>
      {attachment && (
        <div>
          <img src={attachment.data} width={100} height={100} alt="preview" />
          <button type="button" onClick={clearAttachment}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default NweetFactory;