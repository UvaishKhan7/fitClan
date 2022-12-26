import React from 'react';
import './account.css';
import { UserAuth } from '../../UserAuthContext';

export default function Account() {

    const {userDetails} = UserAuth();
    console.log(userDetails)

    return (
        <div className='account'>
            <div className="account_details">
                <p>Username is </p>
                <p>Weight is </p>
                <p>Height is </p>
                <p>Meals per day are </p>
                <p>Activity level </p>
                <p>Your BMI is </p>
                <p>Your BMR is </p>
                <p>Your BFP is </p>
                <p>Your IBW is </p>
                <p>Your TDEE is {userDetails.json()} </p>
            </div>
        </div>
    )
}
