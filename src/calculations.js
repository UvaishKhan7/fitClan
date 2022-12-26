import { UserAuth } from "../../UserAuthContext";


const { userDetails } = UserAuth();

//Formula for calculating calorie/day
const caloriePerDay= userDetails.gender==='male'?
(66.5 + (13.75 * userDetails.weight) + (5.003 * userDetails.height) - (6.75 * userDetails.age)) * userDetails.activity
:
(66.5 + (13.75 * userDetails.weight) + (5.003 * userDetails.height) - (6.75 * userDetails.age)) * userDetails.activity


//fromula for calculating daily protein intake
  const dailyProtein= userDetails.gender==='male'?(userDetails.weight*0.8):(userDetails.weight*0.65)
  
//fromula for calculating daily Carbohydrate
  
  
//fromula for calculating daily Fat intake
