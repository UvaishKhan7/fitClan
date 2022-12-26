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
    const [BMI, setBMI] = useState({});
    const [BMR, setBMR] = useState({});
    const [BFP, setBFP] = useState({});
    const [IBW, setIBW] = useState({});
    const [TDEE, setTDEE] = useState({});

    const signUp = (email, password, username, age, weight, hight, meals, activityLevel, timestamp) => {
        setError('');
        createUserWithEmailAndPassword(auth, email, password)
            .then(async (result) => {
                console.log(result);
                try {
                    const ref = doc(db, 'user', result.user.uid)
                    const docRef = await setDoc(ref, {
                        username, age,
                        weight, hight, meals, activityLevel, timestamp
                    })
                    alert('New User Created Successfully.')
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

    //fetching data through API for BMI
    useEffect(() => {
        fetch(`https://mega-fitness-calculator1.p.rapidapi.com/bmi?weight=${userDetails.weight}&height=${userDetails.height}`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response =>
                setBMI(response))
            .catch(err => console.error(err));
    }, [userDetails.weight, userDetails.height])

    //fetching data through API for BMR
    useEffect(() => {
        fetch(`https://mega-fitness-calculator1.p.rapidapi.com/bmr?weight=${userDetails.weight}&height=${userDetails.height}&age=${userDetails.age}&gender=${userDetails.gender}`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response =>
                setBMR(response))
            .catch(err => console.error(err));
    }, [userDetails.weight, userDetails.height, userDetails.age, userDetails.gender])

    //fetching data through API for BFP
    useEffect(() => {
        fetch(`https://mega-fitness-calculator1.p.rapidapi.com/bfp?weight=${userDetails.weight}&height=${userDetails.height}&age=${userDetails.age}&gender=${userDetails.gender}`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response =>
                setBFP(response))
            .catch(err => console.error(err));
    }, [userDetails.weight, userDetails.height, userDetails.age, userDetails.gender])

    //fetching data through API for IBW
    useEffect(() => {
        fetch(`https://mega-fitness-calculator1.p.rapidapi.com/ibw?weight=${userDetails.weight}&height=${userDetails.height}&gender=${userDetails.gender}`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response =>
                setIBW(response))
            .catch(err => console.error(err));
    }, [userDetails.weight, userDetails.height, userDetails.gender]);

    //fetching data through API for TDEE
    useEffect(() => {
        fetch(`https://mega-fitness-calculator1.p.rapidapi.com/tdee?weight=${userDetails.weight}&height=${userDetails.height}&activitylevel=${userDetails.activityLevel}&age=${userDetails.age}&gender=${userDetails.gender}`, {
            'method': 'GET',
            'headers': {
                'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
                'X-RapidAPI-Host': 'mega-fitness-calculator1.p.rapidapi.com'
            }
        })
            .then(response => response.json())
            .then(response =>
                setTDEE(response))
            .catch(err => console.error(err));
    }, [userDetails.weight, userDetails.height, userDetails.activityLevel, userDetails.age, userDetails.gender])

    return (
        <userContext.Provider value={{ signUp, user, userDetails, logout, signIn, BMI, BMR, BFP, IBW, TDEE }}>
            {children}
        </userContext.Provider>
    );
};

export default UserAuthContext;