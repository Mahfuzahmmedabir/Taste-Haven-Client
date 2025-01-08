import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { auth } from '../../firebase/firebase.init';
import useAxiosOpen from '../../hooks/useAxiosOpen';

export const AuthContext = createContext(null);
const porvider = new GoogleAuthProvider();
const axiosOpen = useAxiosOpen();
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const loginWithEmailAndPasswrord = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  const loginInwithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, porvider);
  };
  const updeateProfile = (name, photo) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };
  const logout = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribed = onAuthStateChanged(auth, cureentUser => {
      setUser(cureentUser);
      setLoading(false);
      console.log(cureentUser);
      if (cureentUser) {
        const usrInfo = { email: cureentUser.email };
        axiosOpen.post('/jwt', usrInfo).then(res => {
          if (res.data.token) {
            localStorage.setItem('acces-token', res.data.token);
          }
        });
      } else {
        localStorage.removeItem('acces-token');
      }
    });

    return () => {
      return unsubscribed();
    };
  }, [axiosOpen]);
  const authInfo = {
    user,
    loading,
    createUser,
    loginInwithGoogle,
    loginWithEmailAndPasswrord,
    logout,
    updeateProfile,
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
