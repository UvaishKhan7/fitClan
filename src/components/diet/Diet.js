import React, { useState } from "react";
import "./Diet.css";
import CustomDiet from "../CustomDiet/CustomDiet";
import db from "../../firebase";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { UserAuth } from "../../UserAuthContext";
import { Add } from "@mui/icons-material";
import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

export default function Diet() {
  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState();
  const [intake, setIntake] = useState([]);

  const { user, userDetails, BMRMen, BMRWomen, meals } = UserAuth();

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
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
      border: 0,
    },
  }));

  function createData(name, intake, required) {
    return { name, intake, required };
  }

  const reqCal =
    userDetails.gender === "male"
      ? BMRMen * userDetails.activityLevel
      : (BMRWomen * userDetails.activityLevel).toFixed(2);
  const reqCarbs = ((reqCal * 55) / 100).toFixed(2);
  const reqProt = (userDetails.weight * 2.2).toFixed(2);
  const reqFat = (userDetails.weight * 0.8).toFixed(2);

  const sumOfCalory = intake
    .map((object) => object.totalCalory)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const sumOfCarbs = intake
    .map((object) => object.totalCarbs)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const sumOfProteins = intake
    .map((object) => object.totalProteins)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);
  const sumOfFat = intake
    .map((object) => object.totalFat)
    .reduce((acc, val) => acc + val, 0)
    .toFixed(2);

  const rows = [
    createData("Calories (kCal)", sumOfCalory, reqCal),
    createData("Carbs (g)", sumOfCarbs, reqCarbs),
    createData("Proteins (g)", sumOfProteins, reqProt),
    createData("Fat (g)", sumOfFat, reqFat),
  ];

  const addMeal = async (e) => {
    e.preventDefault();

    if (user.uid) {
      const dbRef = collection(db, "user", user.uid, "meals");
      await addDoc(dbRef, {
        name: mealName,
        time: mealTime,
        timestamp: serverTimestamp(),
      });
      setMealName("");
      setMealTime();
    }
  };


  return (
    <div className="diet">
      {!meals ? (
        <p className="btn_create_plan" onClick={addMeal}>
          Want to create your own diet plan? Click Here
        </p>
      ) : (
        <div className="meal_name_input">
          <h6 className="add_meal_option">Add New Meal to Your List</h6>
          <input
            className="add_meal_input_name"
            type="text"
            onChange={(e) => setMealName(e.target.value)}
            name="mealName"
            id="name"
            placeholder="Enter meal name e.g. Breakfast"
          />
          <input
            className="add_meal_input_time"
            type="time"
            name="mealTime"
            id="time"
            onChange={(e) => setMealTime(e.target.value)}
          />
          <Button
            type="submit"
            className="add_meal_input_btn"
            variant="contained"
            onClick={addMeal}
          >
            {" "}
            <Add /> Add Meal
          </Button>
        </div>
      )}

      <div className="table_container">
        <TableContainer component={Paper}>
          <Table
            sx={{
              width: {
                xs: 380, // theme.breakpoints.up('xs')
                sm: 380, // theme.breakpoints.up('sm')
                md: 500, // theme.breakpoints.up('md')
                lg: 600, // theme.breakpoints.up('lg')
                xl: 900, // theme.breakpoints.up('xl')
              },
            }}
            aria-label="customized table"
          >
            <TableHead>
              <TableRow>
                <StyledTableCell>Macros Table</StyledTableCell>
                <StyledTableCell align="right">Intake</StyledTableCell>
                <StyledTableCell align="right">Required</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell component="th" scope="row">
                    {row.name}
                  </StyledTableCell>
                  <StyledTableCell align="right">{row.intake}</StyledTableCell>
                  <StyledTableCell align="right">
                    {row.required}
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <div className="custom_diet_items">
        {meals?.map((meal) => (
          <CustomDiet
            key={meal.id}
            id={meal.id}
            title={meal.name}
            time={meal.time}
            meals={meals}
            setIntake={setIntake}
          />
        ))}
      </div>

      <h2>Common diet plans</h2>
      <div className="commonDiet">
        <div className="common_diet_plan common_diet_plan_1">
          <h3>Weight Loss</h3>
        </div>
        <div className="common_diet_plan common_diet_plan_2">
          <h3>High protein</h3>
        </div>
        <div className="common_diet_plan common_diet_plan_3">
          <h3>High-Protein low-fat</h3>
        </div>
        <div className="common_diet_plan common_diet_plan_4">
          <h3>Ketogenic Plan</h3>
        </div>
        <div className="common_diet_plan common_diet_plan_5">
          <h3>mass gainer</h3>
        </div>
        <div className="common_diet_plan common_diet_plan_6">
          <h3>plan</h3>
        </div>
      </div>
    </div>
  );
}
