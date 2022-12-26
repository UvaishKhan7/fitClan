import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthErrorCodes } from 'firebase/auth';
import { collection, doc, onSnapshot, query, setDoc } from 'firebase/firestore';
import db, {
    auth, createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged,
} from './firebase';

const userContext = createContext();

export const UserAuth = () => {
    return useContext(userContext);
};

const UserAuthContext = ({ children }) => {
    // eslint-disable-next-line
    const [error, setError] = useState('');
    const [user, setUser] = useState();
    const [userDetails, setUserDetails] = useState({});
    
    const signUp = (email, password, username, gender, age, weight, height, meals, activityLevel) => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                console.log(result);
                try {
                    const ref = doc(db, 'user', result.user.uid)
                    const docRef = await setDoc(ref, {
                        email, password, username, gender, age, weight, height, meals, activityLevel
                    })
                    console.log(docRef.id)
                } catch (error) {
                    console.error(error)
                }
            }).catch(err => {
                if (err.code === 'auth/email-already-in-use') {
                    setInterval(() => {
                        setError('')
                    }, 3000)
                    setError('Email already in use.')
                } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
                    setInterval(() => {
                        setError('')
                    }, 3000)
                    setError("Password Must be 6 Character!")
                } else {
                    setError(err.message)
                }
            })
    };

    const signIn = (email, password) => {
        setError('');
        signInWithEmailAndPassword(auth, email, password)
    };
    
    const logout = () => {
        return signOut(auth)
    }

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const q = query(collection(db, 'user'));
        const unsub = onSnapshot(q, (snapshot) => {
            snapshot.forEach((doc) => {
                setUserDetails({
                    ...doc.data(),
                    id: doc.id
                })
            });
        })
        return () => unsub();
    }, []);
  
    return (
        <userContext.Provider value={{ signUp, user, userDetails, logout, signIn, error }}>
            {children}
        </userContext.Provider>
    );
};

export default UserAuthContext;