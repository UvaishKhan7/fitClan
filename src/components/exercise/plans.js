import React from 'react';
import './plans.css';

export default function Plans({ title, details }) {
  return (
    <div className='exercise__plans'>
      <h3>{title}</h3>
      <p>{details}</p>
    </div>
  )
}

Plans.defaultProps = {
  title: 'Plan Title',
  details: 'Plan Details'
}