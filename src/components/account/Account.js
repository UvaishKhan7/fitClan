import React from 'react';
import './account.css';
import { UserAuth } from '../../UserAuthContext';

export default function Account() {

    const { userDetails } = UserAuth();

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
                <p>Username: {userDetails.username} </p>
                <p>Weight: {userDetails.weight} </p>
                <p>Height: {userDetails.height} </p>
                <p>Meals per day : {userDetails.meals} </p>
                <p>Activity level: {userDetails.activityLevel}</p>
                <p>Your BMI: {BMI} </p>
                <p>Your BMR: &nbsp;
                    <strong>
                        {(userDetails.gender === 'male') ? (BMRMen) : (BMRWomen)}
                    </strong> calories/day
                </p>
                <p>Your BFP: &nbsp;
                    <strong className=''>
                        {
                            (userDetails.gender === 'male') ? (BFPMen) : (BFPWomen)
                        }
                    </strong>
                </p>
                <p>Your IBW: &nbsp;
                    <strong className=''>
                        {
                            (userDetails.gender === 'male') ? (IBWMen) : (IBWWomen)
                        }
                    </strong>
                </p>
            </div>
        </div>
    )
}
