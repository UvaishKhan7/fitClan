import React, { useEffect, useState } from "react";
import "./CustomDiet.css";
import { BsSearch } from "react-icons/bs";
import { AiOutlineClose } from "react-icons/ai";
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { UserAuth } from "../../UserAuthContext";
import { addDoc, collection, onSnapshot, query } from "firebase/firestore";
import db from "../../firebase";

const CustomDiet = ({ foodData }) => {

  const { user, userDetails } = UserAuth();

  //Formula for calculating calorie/day
  const caloriePerDay = userDetails.gender === 'male' ?
    ((66.5 + (13.75 * userDetails.weight) + (5.003 * userDetails.height) - (6.75 * userDetails.age)) * userDetails.activityLevel).toFixed(2)
    :
    ((66.5 + (13.75 * userDetails.weight) + (5.003 * userDetails.height) - (6.75 * userDetails.age)) * userDetails.activityLevel).toFixed(2);

  //fromula for calculating daily protein intake
  const dailyProtein = (userDetails.gender === 'male' ? (userDetails.weight * 0.8) : (userDetails.weight * 0.65)).toFixed(2);

  //fromula for calculating daily Carbohydrate
  const dailyCarbs = (caloriePerDay * (55 / 100)).toFixed(2);

  //fromula for calculating daily Fat intake
  const dailyFat = (caloriePerDay * (30 / 100)).toFixed(2);

  const [searchedData, setsearchedData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  // eslint-disable-next-line
  const [mealdata, setmealdata] = useState([])
  const [selectedMeal, setSelectedMeal] = useState(1);
  const [totalCal, setTotalCal] = useState(0);
  const [totalProtein, setTotalProtein] = useState(0);
  const [totalCarbohydrate, setTotalCarbohydrate] = useState(0);
  const [totalFat, setTotalFat] = useState(0);
  const [fetchMeal, setFetchMeals] = useState();
  //const [mealId, setMealId] = useState();

  useEffect(() => {
    if (user.uid) {
      const q = query(collection(db, "user", user.uid, `Meal ${selectedMeal}`));
      onSnapshot(q, (snapshot) => {
        setFetchMeals(snapshot.docs.map((doc) =>
          doc.data()))
        console.log('fetchMeal', fetchMeal[0].name)
      });
    }// eslint-disable-next-line
  }, [user.id]);


  useEffect(() => {
    const data = [];

    for (let i = 1; i <= userDetails.meals; i++) {
      data.push(
        { mealNo: i, items: [] }
      )
    }
    setmealdata(data)
  }, [userDetails])

  //mui table
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: theme.palette.common.black,
      color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14,
    },
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
      border: 0,
    },
  }));

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData('Calories', totalCal.toFixed(1), caloriePerDay),
    createData('Proteins', totalProtein.toFixed(1), dailyProtein),
    createData('Carbohydates', totalCarbohydrate.toFixed(1), dailyCarbs),
    createData('Fat', totalFat.toFixed(1), dailyFat),
  ];
  //end of mui table 

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
  };

  const additem = async (item) => {

    if (item) {
      const mealColRef = collection(db, "user", user.uid, `Meal ${selectedMeal}`);
      await addDoc(mealColRef, {
        name: item.name,
        carbs: item.carbohydrate,
        protein: item.proteins,
        fat: item.fat,
        calory: item.calories
      })
      console.log('mealColRef', mealColRef)
    }

    for (let i = 0; i < mealdata.length; i++) {
      if (selectedMeal - 1 === i) {
        mealdata[i].items.push({ item });
      }
    }
    setTotalCal(totalCal + item.calories)
    setTotalProtein(totalProtein + item.proteins)
    setTotalCarbohydrate(totalCarbohydrate + item.carbohydrate)
    setTotalFat(totalFat + item.fat)
    handleClear();
  }

  return (
    <>
      {/* Table for showing required macros & your plan macros */}
      <div className="totalMacro">
        <TableContainer component={Paper}>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell>Macro</StyledTableCell>
                <StyledTableCell align="right">Your Plan</StyledTableCell>
                <StyledTableCell align="right">Recommended</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    <strong>{row.name}</strong>
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.calories}</StyledTableCell>
                  <StyledTableCell align="right">{row.fat}</StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      {/* Dropdown for selecting meal & search bar for searching food items */}
      <div className="searchNadd">

        {/* Meal selection dropdown */}
        <div className="mealSelector">
          <select onChange={(e) => setSelectedMeal(e.target.value)}>
            {mealdata.map((options, name) => {
              return (<option key={name} value={options.mealNo} className='meal_dropdown'>Meal {options.mealNo}</option>)
            })}
          </select>
        </div>

        {/* food item search bar */}
        <div className="searchbar">
          <div className="searchinput">
            <input className="mealinput"
              placeholder="Search"
              value={wordEntered}
              onChange={handleSearch}
            ></input>
            {wordEntered !== 0 ? (
              <AiOutlineClose className="searchicon" onClick={handleClear} />
            ) : (
              <BsSearch className="searchicon" />
            )}
          </div>

          {searchedData !== 0 && (
            <div className="searchresults">
              {searchedData.slice(0, 10).map((item, name) => {
                return (
                  <div key={name} className="resultsList" onClick={e => additem(item)}>
                    <strong>{item.name.toUpperCase()}</strong>
                    <br />
                    <span style={{ fontSize: '12px', color: 'grey' }}>({item.calories} kcal, Carbs:{item.carbohydrate}g, Protein:{item.proteins}g, Fat:{item.fat}g )</span>
                  </div>
                );
              })}
            </div>
          )}

        </div>

      </div>

      <div className="customDiet">
        {mealdata.map((mealGroup) => {
          return (
            <div className="dietgGroup">
              <div className="mealButton">Meal {mealGroup.mealNo}</div>
              {mealGroup.items.map((food, foodId) => {
                return (
                  <div className="dietitem" draggable>
                    {
                      fetchMeal?.map(() => (
                        <>
                          <div>{fetchMeal.name}</div>
                          <div>{fetchMeal.calory}</div>
                          <div>{fetchMeal.protein}</div>
                        </>
                      ))
                    }
                    <div>{food.item.name.toUpperCase()}</div>
                    <div>({food.item.calories} kcal)</div>
                  </div>
                );
              })}
            </div>
          )
        })}
      </div>
    </>
  );
};

export default CustomDiet;