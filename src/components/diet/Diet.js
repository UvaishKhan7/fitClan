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
    <div className='diet  p-5'>


      <div className='dietHeading' id='createplan'>
        {!showPlan ? <h2>Want to create your own diet plan?</h2> : <h2 className='custPlan'>Customise Your Diet Plan</h2>}
        {!showPlan && <a href='#createplan'><div className='createPlan' onClick={showDietMaker}>Create</div></a>}
      </div>
      {showPlan && <CustomDiet foodData={foodData} />}

      <br></br>
      <h2>Common diet plans</h2>
      <div className='commonDiet'>

        <div className='row1'>
          <div className='plan1 plan'><h3>Weight Loss</h3></div>
          <div className='plan2 plan'><h3>High protein</h3></div>
        </div>

        <div className='row2'>
          <div className='plan1 plan'><h3>High-Protein low-fat</h3></div>
          <div className='plan2 plan'><h3>Ketogenic Plan</h3></div>
        </div>

        <div className='row3'>
          <div className='plan1 plan'><h3>mass gainer</h3></div>
          <div className='plan2 plan'><h3>plan</h3></div>
        </div>

      </div>
    </div>
  )
}