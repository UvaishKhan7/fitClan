import React, { useEffect, useState } from 'react';
import './account.css';
import { UserAuth } from '../../UserAuthContext';
import { doc, onSnapshot } from 'firebase/firestore';
import db from '../../firebase';

export default function Account() {

    const [userDetails, setUserDetails] = useState({});

    const { user } = UserAuth();

    useEffect(() => {
        const docRef = doc(db, 'user', user.uid)

        if (user) {
            onSnapshot(docRef, (snapshot) => {
                setUserDetails(snapshot.data())
            })
        }

    }, [user])

    //Formula for calculating BMI
    const BMI = (userDetails.weight / ((userDetails.height / 100) * (userDetails.height / 100))).toFixed(2);

    //Formula for calculating BMR for men
    const BMRMen = (88.362 + (13.397 * userDetails.weight) + (4.799 * userDetails.height) - (5.677 * userDetails.age)).toFixed(2);

    //Formula for calculating BMR for women 
    const BMRWomen = (447.593 + (9.247 * userDetails.weight) + (3.098 * userDetails.height) - (4.330 * userDetails.age)).toFixed(2);

    //Formula for calculating BFP for men 
    const BFPMen = ((1.20 * BMI) + (0.23 * userDetails.age) - 16.2).toFixed(2);

    //Formula for calculating BFP for women
    const BFPWomen = ((1.20 * BMI) + (0.23 * userDetails.age) - 5.4).toFixed(2);

    //Formula for calculating IBW for Men
    const IBWMen = (22 * ((userDetails.height / 100) * (userDetails.height / 100))).toFixed(2);

    //Formula for calculating IBW for women
    const IBWWomen = (22 * (((userDetails.height / 100) * (userDetails.height / 100)) - 10)).toFixed(2);

    return (
        <div className='account'>
            <div className="account_details">
                <p>Username: <strong> {userDetails.username} </strong></p>
                <p>Weight:<strong> {userDetails.weight} Kg </strong></p>
                <p>Height:<strong> {userDetails.height} cm</strong></p>
                <p>Meals per day :<strong> {userDetails.meals} Times</strong></p>
                <p>Activity level:<strong> {userDetails.activityLevel}</strong></p>
                <p>BMI:<strong> {BMI} </strong></p>
                <p>BMR:
                    <strong>
                        {(userDetails.gender === 'male') ? (BMRMen) : (BMRWomen)} calories/day
                    </strong>
                </p>
                <p>BFP:
                    <strong className=''>
                        {
                            (userDetails.gender === 'male') ? (BFPMen) : (BFPWomen)
                        } %
                    </strong>
                </p>
                <p>IBW:
                    <strong className=''>
                        {
                            (userDetails.gender === 'male') ? (IBWMen) : (IBWWomen)
                        } Kg
                    </strong>
                </p>
            </div>
        </div>
    )
}
