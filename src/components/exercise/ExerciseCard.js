import React from 'react';
import './exerciseCard.css'
import { BiBody } from 'react-icons/bi'
import { CgGym } from 'react-icons/cg'

const ExerciseCard = ({ searchedData }) => {

  return (
    <div className="card-wrapper">
      {searchedData.splice(0, 15).map((exercise, index) => {
        return (
          <div key={index} className="exercise-card" >
            <div className='gif'><img src={exercise.gifUrl} alt={exercise.name}></img></div>
            <div className='exerscise-details'>
              <div className='exercise-name'>{exercise.name}</div>
              <div className='target-equipment'>
                <div className='badge'><BiBody /> {exercise.bodyPart} | {exercise.target}</div>
                <div className='badge'><CgGym /> {exercise.equipment}</div>
              </div>
            </div>

          </div>
        );
      })}
    </div>
  );
}

export default ExerciseCard;