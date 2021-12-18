import React from 'react';

function Auth() {
  const handleSubmit = (event: React.SyntheticEvent) => {
    const formData = new FormData(event.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);
    event.preventDefault();
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="text" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        {/* <input type="submit" value="Log In" /> */}
        <button type="submit">Log In</button>
      </form>
      <div>
        <button>Continue with Goole</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;