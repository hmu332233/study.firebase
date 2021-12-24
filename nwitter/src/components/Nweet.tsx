import React from 'react';

import { dbService } from 'firebaseInstance';

type Props = {
  nweet: Nweet,
  isOwner: boolean,
};

function Nweet({
  nweet,
  isOwner,
}: Props) {

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
    }
  };

  return (
    <div>
      <h4>{nweet.contents}</h4>
      {isOwner && (
        <>
          <button>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
}

export default Nweet;