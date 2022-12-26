import React from "react";
import "./home.css";
import Button from "react-bootstrap/esm/Button";
import barbellicon from '../../assets/Barbell.svg'
import dieticon from '../../assets/icons8-diet-20.png'
import { Link } from "react-router-dom";
import { UserAuth } from "../../UserAuthContext";

export default function Home() {

  const { userDetails } = UserAuth();

  //Formula for calculating BMI
  const BMI = (userDetails.weight / ((userDetails.height / 100) * (userDetails.height / 100))).toFixed(2);

  //Formula for calculating BMR for men
  const BMRMen = (88.362 + (13.397 * userDetails.weight) + (4.799 * userDetails.height) - (5.677 * userDetails.age)).toFixed(2);

  //Formula for calculating BMR for women 
  const BMRWomen = (447.593 + (9.247 * userDetails.weight) + (3.098 * userDetails.height) - (4.330 * userDetails.age)).toFixed(2);

  //Formula for calculating BFP for men 
  const BFPMen = ((1.20 * BMI) + (0.23 * userDetails.age) - 16.2).toFixed(2);

  //Formula for calculating BFP for women
  const BFPWomen = ((1.20 * BMI) + (0.23 * userDetails.age) - 5.4).toFixed(2);

  //Formula for calculating IBW for Men
  const IBWMen = (22 * ((userDetails.height/100)*(userDetails.height/100))).toFixed(2)

  //Formula for calculating IBW for women
  const IBWWomen = (22 * (((userDetails.height/100)*(userDetails.height/100))-10)).toFixed(2)


  return (
    <div className="homeContainer">
      <div className="rowWrapper">
        <div className="detailsWrapper">
          <h5>Hey {userDetails?.username}! Please see your fitness status.</h5>
          <div className="cards">
            <div className="card1">
              <h6>BMI (Body Mass Index)</h6>
              <p><strong> {BMI}</strong></p>
            </div>
            <div className="card1">
              <h6>BMR (Basal Metabolic Rate)</h6>
              <p>
                <strong>
                  {(userDetails.gender === 'male') ? (BMRMen) : (BMRWomen)} Kcal/day
                </strong> 
                </p>
            </div>
            <div className="card1">
              <h6>BFP (Body Fat Percentage)</h6>
              <p>
                <strong className=''>
                  {
                    (userDetails.gender === 'male') ? (BFPMen) : (BFPWomen)
                  } %
                </strong>
              </p>
            </div>
            <div className="card1">
              <h6>IBW (Ideal Body Weight)</h6>
              <p>
              <strong className=''>
                  {
                    (userDetails.gender === 'male') ? (IBWMen) : (IBWWomen)
                  } Kg
                </strong>
              </p>
            </div>
          </div>
        </div>

        <div className="GetstartedWrapper">
          <div className="Getstarted-Diet">
            <ul style={{ listStyle: 'circle' }}>
              <li>Free workout plans</li>
              <li>Know your workout</li>
              <li>Home/gym workouts</li>
              <li>Achieve your goal</li>
            </ul>
            <div className="buttonDiv">
              <Link to='/exercise'><Button variant='warning'>Get Start <img src={barbellicon} alt="icon" width={35}></img></Button></Link>
            </div>
          </div>
          <div className="Getstarted-Workout">
            <ul style={{ listStyle: 'circle' }}>
              <li>Get diet plans</li>
              <li>Know you BMI</li>
              <li>Know your calories</li>
              <li>Nutrition advises</li>
            </ul>
            <div className="buttonDiv">
              <Link to='/diet'><Button variant='warning'>Get Start <img src={dieticon} alt="icon"></img></Button></Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}