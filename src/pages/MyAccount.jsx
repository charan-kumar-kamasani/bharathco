import React, { useState, useEffect } from "react";
import { auth, googleProvider } from "../utils/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

const MyAccount = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    const email = localStorage.getItem("email");
    setUserData({
      name: storedUsername,
      email: email,
      // photoURL: user.photoURL,
    });
  }, []);
  const handleGoogleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const user = result.user;

      setUserData({
        name: user.displayName,
        email: user.email,
        photoURL: user.photoURL,
      });
      console.log("User signed in:", user);
    } catch (error) {
      setError("Error signing in with Google. Please try again.");
      console.error("Error signing in with Google:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    setError(null);
    try {
      await signOut(auth);
      localStorage.clear();
      setUserData(null);
    } catch (error) {
      setError("Error signing out. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 border border-gray-300 rounded-lg shadow-lg bg-white mt-20">
      <h1 className="text-2xl font-semibold text-center mb-4">My Account</h1>
      {loading && <p className="text-center">Loading...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {userData ? (
        <div className="text-center">
          <img
            src={userData.photoURL}
            alt={userData.name}
            className="w-24 h-24 rounded-full mx-auto mb-4"
          />
          <p className="text-lg">
            <strong>Name:</strong> {userData.name}
          </p>
          <p className="text-lg">
            <strong>Email:</strong> {userData.email}
          </p>
          <button
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      ) : (
        <div className="text-center">
          <p className="mb-4">Please sign in to access your account.</p>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={handleGoogleSignIn}
          >
            Continue with Google
          </button>
        </div>
      )}
    </div>
  );
};

export default MyAccount;
