import React, { useEffect, useState } from 'react';
import './exercise.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';
import { Skeleton } from '@mui/material';

export default function Exercise() {

  const [exercise, setExercise] = useState([{}]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
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
    setInterval(() => {
      setLoading(false);
    }, 2500)
  }, [])

  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_outer">
        {
          exercise?.map((item) => (

            <div key={item.id} className="exercise_plans">
              {
                loading
                  ? <Skeleton className='m-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={380} />
                  : <img src={item.backgroundUrl} alt="img" />
              }
              <div className="exercise_plans_container">
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : (<h3>{item.title} &nbsp;
                      <small>({item.category})</small>
                    </h3>)
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : <a className='btn btn-danger w-100' href={item.pdfUrl} download={true}>Download PDF</a>
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={75} />
                    : (<p className="goal_plan">
                      {item.details}
                    </p>)
                }
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}
