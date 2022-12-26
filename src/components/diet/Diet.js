import React from 'react';
import { UserAuth } from '../../UserAuthContext';
import './Diet.css'
import foodData from '../../foodData.json'
import CustomDiet from '../CustomDiet/CustomDiet';

export default function Diet() {

    const {user} = UserAuth();

  return (
    <div className='diet  p-5'>
        <h2>Hello {user && user.email}</h2>
        <h2>Calculate your Calorie intake and create your own diet plan</h2>  
        <CustomDiet foodData={foodData}/>    
    </div>
  )
}