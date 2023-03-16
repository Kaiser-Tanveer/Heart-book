import React, { createContext, useEffect, useState } from 'react';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import app from '../Firebase/firebase.config';

export const AuthContext = createContext();
const auth = getAuth(app)
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUser = (displayName, photoURL) => {
        if (auth.currentUser !== null) {
            return updateProfile(auth.currentUser, { displayName, photoURL })
        }
    }


    useEffect(() => {
        const unsubscribe = (onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
        }))
        return () => {
            return unsubscribe;
        }
    }, []);

    const authValue = {
        loading,
        user,
        createUser,
        signIn,
        logOut,
        updateUser
    }
    return (
        <AuthContext.Provider value={authValue}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
