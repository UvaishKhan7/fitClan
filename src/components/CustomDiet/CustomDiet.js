import React, { useState } from "react";
import "./CustomDiet.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import CalorieCalculator from "../CalorieCalculator/CalorieCalculator";

const CustomDiet = ({ foodData }) => {
  const [numberofMeals, setnumberofMeals] = useState(4);
  const data = []
  for (let i = 1; i <= numberofMeals; i++) {
    data.push(
      { mealNo: i, items: [] }
    )
  }
  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // eslint-disable-next-line
  const [mealdata, setmealdata] = useState(data)
  const [selectedMeal, setSelectedMeal] = useState(1);
  const [totalCal, setTotalCal] = useState(0);

  const handleSearch = (e) => {
    const searchedWord = e.target.value.toLowerCase();
    setWordEntered(searchedWord);
    const filteredData = foodData.filter((value) => {
      return value.name.includes(searchedWord);
    });
    searchedWord === "" ? setsearchedData([]) : setsearchedData(filteredData);
  };

  const handleClear = () => {
    setsearchedData([]);
    setWordEntered("");

    console.log(mealdata[selectedMeal - 1].mealNo)

  };

  const additem = (item) => {

    for (let i = 0; i < mealdata.length; i++) {
      if (selectedMeal - 1 === i) {
        mealdata[i].items.push({ item });
        console.log("in meal1", mealdata[0].items, "in meal2", mealdata[1].items, "in meal3", mealdata[2].items);
      }
    }
    setTotalCal(totalCal + item.calories)
    handleClear();
  }


  return (
    <>
      <CalorieCalculator setnumberofMeals={setnumberofMeals} />

      <div className="searchbar">
        <div className="searchinput">
          <input
            placeholder="Search"
            value={wordEntered}
            onChange={handleSearch}
          ></input>
          {wordEntered !== 0 ? (
            <AiOutlineClose onClick={handleClear} />
          ) : (
            <BsSearch className="searchicon" />
          )}
        </div>

        {searchedData !== 0 && (
          <div className="searchresults">
            {searchedData.slice(0, 10).map((item, key) => {
              return (
                <div className="resultsList">
                  <div>{item.name}</div>
                  <button
                    onClick={e => additem(item)}>
                    +
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
      <div className="mealsButton">
        <select onChange={(e) => setSelectedMeal(e.target.value)}>
          {/* <option>--select meal number--</option> */}
          {mealdata.map((options) => {

            return (
              <option value={options.mealNo}>meal{options.mealNo}</option>
            )
          })}
          {/* <option value={1}>meal1</option>
        <option value={2}>meal2</option>
        <option value={3} >meal3</option> */}
        </select>
      </div>



      <div className="customDiet">
        {mealdata.map((mealGroup) => {
          return (
            <div className="dietgGroup">
              <div className="mealButton">Meal {mealGroup.mealNo}</div>
              {mealGroup.items.map((food, foodId) => {

                return (
                  <div className="dietitem" draggable>
                    <div>{food.item.name.toUpperCase()}</div>
                    <div>({food.item.calories} kcal)</div>
                  </div>
                );
              })}
            </div>
          )
        })}
      </div>
      <h1>tot{totalCal}</h1>
    </>
  );
};

export default CustomDiet;