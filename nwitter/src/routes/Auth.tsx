import React, { useState } from 'react';

import { authService } from 'firebaseInstance';
import AuthForm from 'components/AuthForm';

function Auth() {
 
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

  
  return (
    <div>
      <AuthForm />
      <div>
        <button name="google" onClick={handleSocialClick}>Continue with Goole</button>
        <button name="github" onClick={handleSocialClick}>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;