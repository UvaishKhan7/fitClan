import React, { useEffect, useState } from 'react';
import './CustomDiet.css';
import db from '../../firebase';
import { addDoc, collection, deleteDoc, doc, onSnapshot, orderBy, query, serverTimestamp } from 'firebase/firestore';
import { UserAuth } from '../../UserAuthContext';
import { BsSearch } from "react-icons/bs";
import { HiOutlineTrash } from 'react-icons/hi'
import { Button } from '@mui/material';

export default function CustomDiet({ id, title, time , meals }) {

  const [foodItems, setFoodItems] = useState([]);
  const [foodData, setFoodData] = useState([]);
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  const [totalCarbs, setTotalCarbs] = useState(0);
  const [totalProteins, setTotalProteins] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [totalCalories, setTotalCalories] = useState(0);
  const { user } = UserAuth();

  // handleSearch function to handle the searched food item
  const handleSearch = (e) => {
    const searchedWord = e.target.value.toLowerCase();
    setWordEntered(searchedWord);
    const filteredData = foodData.filter((value) => {
      return value.title.includes(searchedWord);
    });
    searchedWord === "" ? setsearchedData([]) : setsearchedData(filteredData);
  };

  // adding new food item to the meal & database
  const additem = async (item) => {

    if (item) {
      const mealColRef = collection(db, "user", user.uid, 'meals', id, `${title}`);
      await addDoc(mealColRef, {
        title: item.title,
        carbs: item.carbs,
        protein: item.proteins,
        fat: item.fat,
        calory: item.calories,
        timestamp: serverTimestamp()
      })
      setsearchedData([]);
      setWordEntered("");
    }
  };

  // for deleting the meal
  const deleteMeal = async (id) => {
    await deleteDoc(doc(db, "user", user.uid, 'meals', id))
  }

  // for deleting food item
  const deleteFoodItem = async (foodId) => {
    await deleteDoc(doc(db, "user", user.uid, 'meals', id, `${title}`, foodId))
  }

  // fetching the food items in a meal 
  useEffect(() => {
    const colRef = collection(db, "user", user.uid, 'meals', id, `${title}`);
    const q = query(colRef, orderBy("timestamp"));
    onSnapshot(q, (snapshot) => {
      setFoodItems(snapshot.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id,
        name: doc.data().title,
        carbs: doc.data().carbs,
        protein: doc.data().protein,
        fat: doc.data().fat,
        calory: doc.data().calory
      })
      ))
    });

    const foodRef = collection(db, "foodItems");
    const qu = query(foodRef);
    onSnapshot(qu, (snapshot) => {
      setFoodData(snapshot.docs.map((doc) =>
      ({
        ...doc.data(),
        id: doc.id,
        name: doc.data().title,
        carbs: doc.data().carbs,
        protein: doc.data().protein,
        fat: doc.data().fat,
        calory: doc.data().calory,
        serving: doc.data().serving,
        unit: doc.data().unit
      })
      ))
    });
}, []);

  useEffect(() => {
    setTotalCarbs(foodItems.reduce((sum, obj) => sum + obj.carbs, 0))
  setTotalCalories(foodItems.reduce((sum, obj) => sum + obj.calory, 0))
  setTotalProteins(foodItems.reduce((sum, obj) => sum + obj.protein, 0))
  setTotalFat(foodItems.reduce((sum, obj) => sum + obj.fat, 0))
  }, [foodItems]);

  return (
    <div className='custom_diet'>
      <div className="title_n_trash">
        <div className='title_n_time'>
          <h6>{title}</h6>
          <small>at {time}</small>
        </div>
        <Button type="submit" onClick={() => deleteMeal(id)} variant="outlined" color="error">Delete Meal &nbsp;<HiOutlineTrash className='trash' /></Button>
      </div>

      {/* food item search bar */}
      <div className="searchbar">
        <div className="searchinput">
          <input className="mealinput"
            placeholder="Search & add food items to your meal"
            value={wordEntered}
            onChange={handleSearch}
          >
          </input>
          <BsSearch className="searchicon" />
        </div>

        {searchedData !== 0 && (
          <div className="searchresults">
            {searchedData.slice(0, 10).map((item, title) => {
              return (
                <div key={title} className="resultsList" onClick={e => additem(item)}>
                  <span className='seaarch_food_title'>{item.title}
                    <span style={{ fontSize: '12px', color: 'grey' }}>
                      &nbsp; ({item.serving} {item.unit})
                    </span></span>
                  <br />
                  <span className='search_food_macros' style={{ fontSize: '12px', color: 'grey' }}>({item.calories} kcal, Carbs:{item.carbs}g, Protein:{item.proteins}g, Fat:{item.fat}g )</span>
                </div>
              );
            })}
          </div>
        )}

      </div>

      {
        foodItems?.map(food => (
          <div key={food.id} className="food_list_item">
            <div className='food_title'>{food.name}{food.serving}
              <Button type="submit" onClick={() => deleteFoodItem(food.id)} variant="outlined" color="error">
                <HiOutlineTrash className='trash' />
              </Button>
            </div>
            <div className="macros">
              <span>Carbs: {food.carbs}g, </span>
              <span>Prot: {food.protein}g, </span>
              <span>Fat: {food.fat}g, </span>
              <span>Cal: {food.calory}kCal</span>
            </div>
          </div>
        ))
      }

      <div className="total_macros">
        Total Cal ={totalCalories.toFixed(2)} kCal,
        Total Prot ={totalProteins.toFixed(2)} g,
        Total Carb ={totalCarbs.toFixed(2)} g,
        Total Fat ={totalFat.toFixed(2)} g
      </div>

    </div >
  )
}
