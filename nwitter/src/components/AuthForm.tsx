import React, { useState } from 'react';

import { authService } from 'firebaseInstance';

type Props = {

};

function AuthForm({}: Props) {
  const [newAccount, setNewAccount] = useState(true);
  const [error, setError] = useState('');

  const toggleAccount = () => {
    setNewAccount(v => !v);
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
    <>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        <span>{error}</span>
        <button type="submit">{newAccount ? 'Create Acccount' : 'Log In'}</button>
      </form>
      <span onClick={toggleAccount}>{newAccount ? 'Sign In' : 'Create Account'}</span>
    </>
  );
};

export default AuthForm;