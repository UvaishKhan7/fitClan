import React, { useEffect, useState } from 'react';
import './AllPlans.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../../firebase';
import { Skeleton } from '@mui/material';

export default function AllPlans() {

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
    }, []);

    return (
        <div className='exercise'>
            <h3>Your exercise plan is below:</h3>

            <div className="exercise_outer">
                {
                    exercise?.map((item) => (

                        <div key={item.backgroundUrl} className="exercise_plans">
                            {
                                !item.backgroundUrl
                                    ? <Skeleton className='m-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={380} />
                                    : <img src={item.backgroundUrl} alt="img" />
                            }
                            <div className="exercise_plans_container">
                                {
                                    !item.title ?
                                        <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                                        : (<h3>{item.title} &nbsp;
                                            <small>({item.category})</small>
                                        </h3>)
                                }
                                {
                                    !item.pdfUrl ?
                                        <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                                        : <a className='btn btn-danger w-100' href={item.pdfUrl} download={true}>Download PDF</a>
                                }
                                {
                                    !item.details ?
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
