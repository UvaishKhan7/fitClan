import React, { useEffect, useState } from 'react';
import './Diet.css'
import CustomDiet from '../CustomDiet/CustomDiet';
import db from '../../firebase';
import { addDoc, collection, onSnapshot, orderBy, serverTimestamp } from 'firebase/firestore';
import { UserAuth } from '../../UserAuthContext';

export default function Diet() {

  const [meals, setMeals] = useState([]);

  const { user } = UserAuth();

  const addMeal = async () => {
    const mealName = prompt("Please enter new meal name");

    if (mealName) {
      const dbRef = collection(db, 'user', user.uid, 'meals');
      const data = { 
        name: mealName,
        timestamp: serverTimestamp()
       };
      addDoc(dbRef, data)
    };
  };

  const colRef = collection(db, "user", user.uid, 'meals');

  useEffect(() => {
    onSnapshot(colRef, (snapshot) => {
      setMeals(snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
        name: doc.data().name
      }), orderBy("timestamp")))
    })// eslint-disable-next-line
  }, []);

  return (
    <div className='diet'>
      {
        !meals ? <p className='btn_create_plan' onClick={addMeal}>Want to create your own diet plan? Click Here</p>
          : <p className="add_meal_option" onClick={addMeal}>Click Here to Add New Meal to Your List</p>
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