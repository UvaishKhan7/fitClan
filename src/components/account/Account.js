import React from 'react';
import './account.css';
import { UserAuth } from '../../UserAuthContext';

export default function Account() {

    const { userDetails, BMI, BMR, BFP, IBW, TDEE } = UserAuth();
    
    return (
        <div className='account'>
            {
                !(BMI && BMI.info) ? (
                    <div>
                        No Details Available
                    </div>
                ) : (
                    <div className="account_details">
                        <p>Username is {userDetails.username}</p>
                        <p>Weight is {userDetails.weight}</p>
                        <p>Height is {userDetails.height}</p>
                        <p>Meals per day are {userDetails.meals}</p>
                        <p>Activity level {userDetails.activityLevel}</p>
                        <p>Your BMI is {BMI && Math.round(BMI.info.bmi*100)/100}</p>
                        <p>Your BMR is {BMR && Math.round(BMR.info.bmr*100)/100}</p>
                        <p>Your BFP is {BFP && Math.round(BFP.info.bfp*100)/100}</p>
                        <p>Your IBW is {IBW && Math.round(IBW.info.devine*100)/100}</p>
                        <p>Your TDEE is {TDEE && Math.round(TDEE.info.tdee*100)/100}</p>
                    </div>
                )
            }
        </div>
    )
}
