<<<<<<< HEAD
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
=======
import React, { useState } from 'react';
import { UserAuth } from '../../UserAuthContext';
import './Diet.css'
import foodData from '../../foodData.json'
import CustomDiet from '../CustomDiet/CustomDiet';

export default function Diet() {

    const {user} = UserAuth();
    const [showPlan, setShowPlan] = useState(false);

    function showDietMaker(){
      setShowPlan(!showPlan)
    }
  return (
    <div className='diet  p-5'>
        <h2>Common diet plans</h2>
        <div className='commonDiet'>

          <div className='row1'>
          <div className='plan1 plan'>plan1</div>
          <div className='plan2 plan'>plan2</div>
          </div>

          <div className='row2'>
          <div className='plan1 plan'>plan1</div>
          <div className='plan2 plan'>plan2</div>
          </div>

          <div className='row3'>
          <div className='plan1 plan'>plan1</div>
          <div className='plan2 plan'>plan2</div>
          </div>

        </div>
        <br></br>
        <div className='dietHeading' id='createplan'>
        {!showPlan?<h2>Want to create your own diet plan?</h2>:<h2>Custom plan</h2>}
        {!showPlan && <a href='#createplan'><div className='createPlan' onClick={showDietMaker}>Create</div></a> }
         
        </div>
        {showPlan && <CustomDiet foodData={foodData}/>} 
    </div>
  )
>>>>>>> 324f9c6239fa93f465ebc53dcb30c8df07c0c9cb
}