import React, { useEffect, useRef, useState } from 'react';
import './exercise.css';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';
import { Skeleton } from '@mui/material';
import Model from 'react-body-highlighter';
import { BsSearch } from 'react-icons/bs';
import ExerciseCard from './ExerciseCard';

export default function Exercise() {

  const [exercise, setExercise] = useState([{}]);
  const [loading, setLoading] = useState(true);
  const [exerciseData, setExerciseData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState('');

  const searchResult = useRef(null)

  useEffect(() => {
    setLoading(true);
    const foodRef = collection(db, "exercise");
    const q = query(foodRef);
    onSnapshot(q, (snapshot) => {
      setExercise(snapshot.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id
      })
      ))
    });
    setInterval(() => {
      setLoading(false);
    }, 3500)
  }, []);

  useEffect(() => {
    const options = {
      method: 'GET',
      headers: {
        'X-RapidAPI-Key': '5ef7f53944mshe6f63588c528930p182765jsn1b4484d497b8',
        'X-RapidAPI-Host': 'exercisedb.p.rapidapi.com'
      }
    };
    
    fetch('https://exercisedb.p.rapidapi.com/exercises', options)
      .then(response => response.json())
      .then(res => {
        setExerciseData(res)
        console.log(res)
      })
                .catch(err => console.error(err));
    
  }, []);

  

  const handleSearch = (e) => {
      
    const filteredData=exerciseData.filter(
      (item) => item.name.includes(wordEntered)
      || item.target.includes(wordEntered)
      || item.equipment.includes(wordEntered)
      || item.bodyPart.includes(wordEntered));
      
              setWordEntered('')
             setsearchedData(filteredData);
             console.log('searchedword',wordEntered)
             window.scrollTo({
              top: searchResult.current.offsetTop,
              behavior: 'smooth',
            });
    };

  return (
    <div className='exercise'>
      <h3>Your exercise plan is below:</h3>
      <div className="exercise_outer">
        {
          exercise?.map((item) => (

            <div key={item.id} className="exercise_plans">
              {
                loading
                  ? <Skeleton className='m-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={380} />
                  : <img src={item.backgroundUrl} alt="img" />
              }
              <div className="exercise_plans_container">
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : (<h3>{item.title} &nbsp;
                      <small>({item.category})</small>
                    </h3>)
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={35} />
                    : <a className='btn btn-danger w-100' href={item.pdfUrl} download={true}>Download PDF</a>
                }
                {
                  loading ?
                    <Skeleton className='mb-2' animation="wave" sx={{ bgcolor: 'grey.900' }} variant='rounded' height={75} />
                    : (<p className="goal_plan">
                      {item.details}
                    </p>)
                }
              </div>
            </div>
          ))
        }
      </div>


      <div className='search-exercise'>
      <h2 >Search Exercises For Details</h2>

      <div className='choose-target'>
      <h3>select by Target</h3>
      <Model  
        
        style={{ width:'40%',padding: '1rem' }}
        highlightedColors={["#ff0000", "#0000ff"]}
        
      />
        <Model
          type="posterior"
          style={{width:'40%', padding: '1rem' }}
          
          highlightedColors={["#ff0000", "#db2f2f"]}
          
        />
      </div>
        </div>
      

      <div className='search-results' >
      <div className="searchbar-exercises" ref={searchResult}>
        <div className="searchinput-exercise">
          <input className='input-exercise'
          onKeyPress={(e) => {
                        if (e.key === "Enter"){
                          handleSearch()
                        } }}
           value={wordEntered}
          onChange={e=>{setWordEntered(e.target.value.toLowerCase())}}
          placeholder="Search Exercises/Body part/Target .."
          type="text"
          >
          </input>
          <BsSearch className="searchicon" onClick={handleSearch}/>
        </div>
        </div>
        {searchedData !== 0 && (
          <ExerciseCard searchedData={searchedData}/>
        )}
     </div>

    </div>
  )
}
