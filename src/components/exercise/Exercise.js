import React, { useEffect, useRef, useState } from 'react';
import './exercise.css';
import { BsSearch } from 'react-icons/bs';
import ExerciseCard from './ExerciseCard';
import { Link } from 'react-router-dom';
import { BiBody } from 'react-icons/bi';
import { CgGym } from 'react-icons/cg';


export default function Exercise() {

  const [exerciseData, setExerciseData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');
  const [suggestedresult, setSuggestedresult] = useState();
  const [suggestion, setSuggestion] = useState([]);

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

  const handleSuggestions = async (e) => {
    const searchedWord = e.target.value.toLowerCase();
    setWordEntered(searchedWord);
    const filteredExercise = exerciseData.filter(
      (item) => item.name.includes(searchedWord)
        || item.target.includes(searchedWord)
        || item.equipment.includes(searchedWord)
        || item.bodyPart.includes(searchedWord));

    searchedWord === "" ? setSuggestion([]) : setSuggestion(filteredExercise);
    console.log('sugg', suggestion)
  };

  const handleSearch = (e) => {

    const filteredData = exerciseData.filter(
      (item) => item.name.includes(wordEntered)
        || item.target.includes(wordEntered)
        || item.equipment.includes(wordEntered)
        || item.bodyPart.includes(wordEntered));



    setsearchedData(filteredData);
    window.scrollTo({
      top: searchResult.current.offsetTop,
      behavior: 'smooth',
    });
    setWordEntered('')
    setSuggestion([])
  };


  const handlesuggestedSearch = (exercise) => {
    setsearchedData([])
    console.log(exercise)
    setSuggestedresult(exercise)
    window.scrollTo({
      top: searchResult.current.offsetTop,
      behavior: 'smooth',
    });
    setSuggestion([])
  }

  return (
    <div className='exercise-wrapper'>
      <h3>Your exercise plan is below:</h3>

      <div className='plans-exercises' >
        <Link to='/exercise/all_plans' className='btn_link_text'>
          CLICK TO SEE ALL PLANS
        </Link>
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
              onFocus={handleSuggestions}
              onChange={handleSuggestions}
              placeholder="Search Exercises/Body part/Target .."
              type="text"
            >
            </input>
            <BsSearch className="searchicon" onClick={handleSearch} />
          </div>

          <div className='suggestions'>
            {suggestion !== 0 && (
              <div className="suggested-results">
                {suggestion.map((exercise, index) => {
                  return (
                    <div className='suggested-item' key={index} onClick={e => {
                      handlesuggestedSearch(exercise)
                    }}>
                      <div className='item-left'>{exercise.name}</div>

                      <div className='item-right'>
                        <div className='ex-target'><BiBody />{exercise.target}</div>
                        <div className='ex-equipment'><CgGym />{exercise.equipment}</div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

        </div>

      </div>

      <div className='exercise-results' ref={searchResult} >
        {searchedData !== 0 &&
          searchedData.splice(0, 15).map((exercise, index) => (
            <ExerciseCard exercise={exercise} key={index} />
          ))
        }
        {!suggestedresult ? null :
          <ExerciseCard exercise={suggestedresult} />
        }
      </div>

    </div>
  )
}
