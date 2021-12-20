import React from 'react';

function Home() {
  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { contents } = Object.fromEntries(formData);
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