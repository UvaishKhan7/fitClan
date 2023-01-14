import React, { useEffect, useRef, useState } from 'react';
import './exercise.css';
import { BsSearch } from 'react-icons/bs';
import ExerciseCard from './ExerciseCard';
import { Link } from 'react-router-dom';

export default function Exercise() {

  const [exerciseData, setExerciseData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const searchResult = useRef(null)

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '08cb6b5a23msh61955ac733a6c09p1e5199jsne9f9fedd1c4a',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };

    fetch('https://exercisedb.p.rapidapi.com/exercises', options)
      .then(response => response.json())
      .then(res => {
        setExerciseData(res)
      })
      .catch(err => console.error(err));

  }, []);

  const handleSearch = (e) => {

    const filteredData = exerciseData.filter(
      (item) => item.name.includes(wordEntered)
        || item.target.includes(wordEntered)
        || item.equipment.includes(wordEntered)
        || item.bodyPart.includes(wordEntered));

    setWordEntered('')
    setsearchedData(filteredData);
    window.scrollTo({
      top: searchResult.current.offsetTop,
      behavior: 'smooth',
    });
  };

  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>

      <div className='search-results' >
        <div className="searchbar-exercises" ref={searchResult}>
          <h4 >Search Exercises For Details</h4>
          <div className="searchinput-exercise">
            <input className='input-exercise'
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSearch()
                }
              }}
              value={wordEntered}
              onChange={e => { setWordEntered(e.target.value.toLowerCase()) }}
              placeholder="Search Exercises/Body part/Target .."
              type="text"
            >
            </input>
            <BsSearch className="searchicon" onClick={handleSearch} />
          </div>
        </div>

        <Link to='/exercise/all_plans' className='btn_link_text'>
          CLICK TO SEE ALL PLANS
        </Link>
      </div>

      {searchedData !== 0 && (
        <ExerciseCard searchedData={searchedData} />
      )}

    </div>
  )
}
