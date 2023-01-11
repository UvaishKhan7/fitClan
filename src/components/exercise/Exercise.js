import React, { useEffect, useState } from 'react';
import './exercise.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';

export default function Exercise() {

  const [exercise, setExercise] = useState([{}]);

  useEffect(() => {
    const foodRef = collection(db, "exercise");
    const q = query(foodRef);
    onSnapshot(q, (snapshot) => {
      setExercise(snapshot.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id
      })
      ))
    });
  }, [])

  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_outer">
        {
          exercise?.map(item => (
            <div key={item.id} className="exercise_plans">
              <h3>{item.title} &nbsp;
                <small>({item.category})</small>
              </h3>
              <div className="exercise_plans_container">
                <p className="goal_plan">
                  {item.details}
                </p>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
