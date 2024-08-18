// src/components/GoogleSignIn.js
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { auth, provider } from '@/firebase/config';

const GoogleSignIn = ({ onSignIn }) => {

  const handleClick = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      onSignIn(); // Trigger the callback after successful sign-in
    } catch (error) {
      console.error('Sign-in error:', error);
    }
  };

  return (
    <button onClick={handleClick} className="p-2 bg-blue-500 text-white rounded">
      Sign in with Google
    </button>
  );
};

export default GoogleSignIn;
