import React, { createContext, useContext, useEffect, useState } from "react";
import {
  AuthErrorCodes,
  browserSessionPersistence,
  setPersistence,
} from "firebase/auth";
import {
  collection,
  doc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
} from "firebase/firestore";
import db, {
  auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "./firebase";
import { useNavigate } from "react-router";

const userContext = createContext();

export const UserAuth = () => {
  return useContext(userContext);
};

const UserAuthContext = ({ children }) => {
  // eslint-disable-next-line
  const [error, setError] = useState("");
  const [user, setUser] = useState();
  const [userDetails, setUserDetails] = useState({});
  const [BMI, setBMI] = useState(null);
  const [BMRMen, setBMRMen] = useState(null);
  const [BMRWomen, setBMRWomen] = useState(null);
  const [BFPMen, setBFPMen] = useState(null);
  const [BFPWomen, setBFPWomen] = useState(null);
  const [IBWMen, setIBWMen] = useState(null);
  const [IBWWomen, setIBWWomen] = useState(null);
  const [meals, setMeals] = useState([]);

  const navigate = useNavigate();

  const signUp = (
    email,
    password,
    username,
    gender,
    age,
    weight,
    height,
    meals,
    activityLevel
  ) => {
    setError("");
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (result) => {
        console.log(result);
        try {
          const ref = doc(db, "user", result.user.uid);
          const docRef = await setDoc(ref, {
            email,
            password,
            username,
            gender,
            age,
            weight,
            height,
            meals,
            activityLevel,
          });
          console.log(docRef.id);
        } catch (error) {
          console.error(error);
        }
      })
      .catch((err) => {
        if (err.code === "auth/email-already-in-use") {
          setInterval(() => {
            setError("");
          }, 5000);
          setError("Email already in use.");
        } else if (err.code === AuthErrorCodes.WEAK_PASSWORD) {
          setInterval(() => {
            setError("");
          }, 5000);
          setError("Password Must be 6 Character!");
        } else {
          setError(err.message);
        }
      });
  };

  const signIn = (email, password) => {
    setError("");
    setPersistence(auth, browserSessionPersistence)
      .then(() => {
        signInWithEmailAndPassword(auth, email, password);
        navigate("/");
      })
      .catch((err) => {
        setError(err);
        if (err.code === "auth/user-not-found") {
          setInterval(() => {
            setError("");
          }, 5000);
          return setError("User not found!");
        } else if (err.code === "auth/wrong-password") {
          setInterval(() => {
            setError("");
          }, 5000);
          return setError("Please Enter Correct Password!");
        }
      });
  };

  const logout = () => {
    return signOut(auth);
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);

      const docRef = doc(db, "user", currentUser.uid);
      onSnapshot(docRef, (snapshot) => {
        setUserDetails(snapshot.data());

        //Formula for calculating BMI
        setBMI(
          Math.round(
            (snapshot.data().weight /
              ((snapshot.data().height / 100) *
                (snapshot.data().height / 100))) *
              100
          ) / 100
        );

        //Formula for calculating BMR for men
        setBMRMen(
          Math.round(
            (88.362 +
              13.397 * snapshot.data().weight +
              4.799 * snapshot.data().height -
              5.677 * snapshot.data().age) *
              100
          ) / 100
        );

        //Formula for calculating BMR for women
        setBMRWomen(
          Math.round(
            (447.593 +
              9.247 * snapshot.data().weight +
              3.098 * snapshot.data().height -
              4.33 * snapshot.data().age) *
              100
          ) / 100
        );

        //Formula for calculating BFP for men
        const BMIdata =
          snapshot.data().weight /
          ((snapshot.data().height / 100) * (snapshot.data().height / 100));
        setBFPMen(
          Math.round(
            (1.2 * BMIdata + 0.23 * snapshot.data().age - 16.2) * 100
          ) / 100
        );

        //Formula for calculating BFP for women
        setBFPWomen(
          Math.round((1.2 * BMIdata + 0.23 * snapshot.data().age - 5.4) * 100) /
            100
        );

        //Formula for calculating IBW for Men
        setIBWMen(
          Math.round(
            22 *
              ((snapshot.data().height / 100) *
                (snapshot.data().height / 100)) *
              100
          ) / 100
        );

        //Formula for calculating IBW for women
        setIBWWomen(
          Math.round(
            (22 *
              ((snapshot.data().height / 100) *
                (snapshot.data().height / 100)) -
              10) *
              100
          ) / 100
        );
      });
      const colRef = collection(db, "user", currentUser.uid, "meals");
      const q = query(colRef, orderBy("time"));
      onSnapshot(q, (snapshot) => {
        setMeals(
          snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
            name: doc.data().name,
          }))
        );
      });
    });

    return () => {
      unsubscribe();
    };

    // eslint-disable-next-line
  }, []);

  return (
    <userContext.Provider
      value={{
        signUp,
        user,
        userDetails,
        logout,
        signIn,
        error,
        BMI,
        BMRMen,
        BMRWomen,
        BFPMen,
        BFPWomen,
        IBWMen,
        IBWWomen,
        meals,
      }}
    >
      {children}
    </userContext.Provider>
  );
};

export default UserAuthContext;
