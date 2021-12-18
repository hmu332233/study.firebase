import { authService } from 'firebaseInstance';
import React, { useState } from 'react';

function Auth() {
  const [newAccount, setNewAccount] = useState(true);
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
    } catch (err) {
      console.log(err);
    }
    
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="email" type="email" placeholder="Email" required />
        <input name="password" type="password" placeholder="Password" required />
        {/* <input type="submit" value="Log In" /> */}
        <button type="submit">{newAccount ? 'Create Acccount' : 'Log In'}</button>
      </form>
      <div>
        <button>Continue with Goole</button>
        <button>Continue with Github</button>
      </div>
    </div>
  );
};
export default Auth;