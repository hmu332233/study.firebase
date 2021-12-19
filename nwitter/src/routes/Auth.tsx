import React, { useState } from 'react';

import { authService } from 'firebaseInstance';

function Auth() {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const toggleAccount = () => {
    setNewAccount(v => !v);
  }

  const handleSocialClick = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    const { name } = event.currentTarget;

    const providerMap: { [key: string]: typeof authService.GoogleAuthProvider | typeof authService.GithubAuthProvider } = {
      google: authService.GoogleAuthProvider,
      github: authService.GithubAuthProvider,
    };

    const provider = new providerMap[name]();

    await authService.signInWithPopup(authService.auth, provider);
  }

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement);
    const { email, password } = Object.fromEntries(formData);

    try {
      let data;
      if (newAccount) {
        data = await authService.createUserWithEmailAndPassword(
          authService.auth,
          email as string,
          password as string,
        );
      } else {
        data = await authService.createUserWithEmailAndPassword(
          authService.auth,
          email as string,
          password as string,
        );
      }
      console.log(data);
    } catch (err: any) {

      setError(err.message as string);
    }
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <span>{error}</span>
        <button type="submit">{newAccount ? 'Create Acccount' : 'Log In'}</button>
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
      <div>
        <button name="google" onClick={handleSocialClick}>Continue with Goole</button>
        <button name="github" onClick={handleSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;