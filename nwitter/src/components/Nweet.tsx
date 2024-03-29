import React, { useState } from 'react';

import { dbService, storageService } from 'firebaseInstance';

type Props = {
  nweet: Nweet,
  isOwner: boolean,
};

function Nweet({
  nweet,
  isOwner,
}: Props) {
  const [editing, setEditing] = useState(false);

  const toggleEditing = () => {
    setEditing(v => !v);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formElement = event.target as HTMLFormElement;
    const formData = new FormData(formElement);
    const { contents } = Object.fromEntries(formData);

    

    // Set the "capital" field of the city 'DC'
    await dbService.updateDoc(dbService.doc(dbService.db, 'nweets', nweet.id), {
      contents,
    });

    toggleEditing();
  };

  const handleDeleteClick = () => {
    const ok = window.confirm('Are you sure?');

    if (ok) {
      // delete
      dbService.deleteDoc(
        dbService.doc(
          dbService.db,
          'nweets',
          nweet.id,
        )
      );

      const fileRef = storageService.ref(storageService.storage, nweet.attachmentUrl);
      storageService.deleteObject(fileRef);
    }
  };

  return (
    <div>
      {editing ? (
        <form onSubmit={handleSubmit}>
          <input type="text" name="contents" />
          <button type="submit">Edit</button>
        </form>
      ) : (
        <>
          <h4>{nweet.contents}</h4>
          {nweet.attachmentUrl && (
            <img src={nweet.attachmentUrl} width={100} height={100} alt="nweet-img" />
          )}
          {isOwner && (
            <>
              <button onClick={toggleEditing}>Edit</button>
              <button onClick={handleDeleteClick}>Delete</button>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Nweet;