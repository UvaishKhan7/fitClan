import React, { useEffect, useState } from 'react';
import './Diet.css'
import CustomDiet from '../CustomDiet/CustomDiet';
import db from '../../firebase';
import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { UserAuth } from '../../UserAuthContext';
import { Add } from '@mui/icons-material';
import { Button } from '@mui/material';

export default function Diet() {

  const [meals, setMeals] = useState([]);
  const [mealName, setMealName] = useState('')
  const [mealTime, setMealTime] = useState();

  const { user } = UserAuth();

  const addMeal = async (e) => {
    e.preventDefault();

    if (user.uid) {
      const dbRef = collection(db, 'user', user.uid, 'meals');
      await addDoc(dbRef, {
        name: mealName,
        time: mealTime,
        timestamp: serverTimestamp()
      })
    }
    setMealName('');
    setMealTime();
  };

  const colRef = collection(db, "user", user.uid, 'meals');

  useEffect(() => {
     const q = query(colRef, orderBy("time"));
    onSnapshot(q, (snapshot) => {
      setMeals(snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        name: doc.data().name
      })))
    })// eslint-disable-next-line
  }, []);

  return (
    <div className='diet'>
      {
        !meals ? <p className='btn_create_plan' onClick={addMeal}>Want to create your own diet plan? Click Here</p>
          :
          <div className="meal_name_input">
            <h6 className="add_meal_option">Add New Meal to Your List</h6>
            <input type="text" onChange={(e) => setMealName(e.target.value)} name="mealName" id="name" placeholder='Enter meal name e.g. Breakfast' />
            <input type="time" name="mealTime" id="time" onChange={(e) => setMealTime(e.target.value)} />
            <Button type="submit" variant="contained" onClick={addMeal}> <Add /> Add Meal</Button>
          </div>
      }
      <div className='custom_diet_items'>
        {meals?.map(meal => (
          <CustomDiet key={meal.id} id={meal.id} title={meal.name} />
        )
        )}
      </div>

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