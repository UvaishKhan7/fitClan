import React, { useState } from 'react';
import './Diet.css'
import foodData from '../../foodData.json'
import CustomDiet from '../CustomDiet/CustomDiet';

export default function Diet() {

  const [showPlan, setShowPlan] = useState(false);

  function showDietMaker() {
    setShowPlan(!showPlan)
  }

  return (
    <div className='diet'>

      <div className='dietHeading' id='createplan'>
        {!showPlan ? <h2>Want to create your own diet plan?</h2> : <h2 className='custPlan'>Customise Your Diet Plan</h2>}
        {!showPlan && <a href='#createplan'><div className='createPlan' onClick={showDietMaker}><h2>Click Here</h2></div></a>}
      </div>
      {showPlan && <CustomDiet foodData={foodData} />}

      <h2>Common diet plans</h2>
      <div className='commonDiet'>
        <div className='common_diet_plan common_diet_plan_1'><h3>Weight Loss</h3></div>
        <div className='common_diet_plan common_diet_plan_2'><h3>High protein</h3></div>
        <div className='common_diet_plan common_diet_plan_3'><h3>High-Protein low-fat</h3></div>
        <div className='common_diet_plan common_diet_plan_4'><h3>Ketogenic Plan</h3></div>
        <div className='common_diet_plan common_diet_plan_5'><h3>mass gainer</h3></div>
        <div className='common_diet_plan common_diet_plan_6'><h3>plan</h3></div>
      </div>
    </div>
  )
}