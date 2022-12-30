import React from 'react';
import './exercise.css';
import Plans from'./plans';

export default function Exercise() {
  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_plans">
        <h3>Exercise Plans</h3>
        <div className="exercise_plans_container">
          <div className="goal_plan">
            <Plans />
            <Plans />
            <Plans />
            <Plans />
            <Plans />
            <Plans />
          </div>
        </div>
      </div>
    </div>
  )
}
