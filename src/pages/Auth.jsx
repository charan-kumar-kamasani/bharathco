import React, { useState } from 'react';
import { auth, googleProvider } from '../utils/firebase';
import { signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      localStorage.setItem('username', user.displayName);
      localStorage.setItem('email', user.email);

      const redirectTo = localStorage.getItem('redirectTo') || '/';
      navigate(redirectTo);
      localStorage.removeItem('redirectTo');
    } catch (error) {
      console.error('Error signing in with Google:', error);
      setError('Failed to sign in. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-2xl font-bold mb-4">Login</h1>
      {error && <p className="text-red-500">{error}</p>}
      <button
        onClick={handleGoogleSignIn}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Continue with Google
      </button>
    </div>
  );
};

export default Login;
