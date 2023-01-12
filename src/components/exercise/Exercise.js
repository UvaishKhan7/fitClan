import React, { useEffect, useState } from 'react';
import './exercise.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';
//import exercise from '../../workoutData.json';

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
          exercise?.map((item) => (
            <div key={item.id} className="exercise_plans">
              <img src={item.backgroundUrl} alt="img" />
              <div className="exercise_plans_container">
                <h3>{item.title} &nbsp;
                  <small>({item.category})</small>
                </h3>
                <a className='btn btn-danger w-100' href={item.pdfUrl} download={true}>Download PDF</a>
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
