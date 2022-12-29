import React from "react";
import "./home.css";
import Button from "react-bootstrap/esm/Button";
import barbellicon from '../../assets/Barbell.svg'
import dieticon from '../../assets/icons8-diet-20.png'
import { Link } from "react-router-dom";
import { UserAuth } from "../../UserAuthContext";

export default function Home() {

  const { userDetails, BMI, BMRMen, BMRWomen, BFPMen, BFPWomen, IBWMen, IBWWomen } = UserAuth();

  return (
    <div className="homeContainer">
      <div className="rowWrapper">
        <div className="detailsWrapper">

          {/* Get Starter buttons */}
          <div className="GetstartedWrapper">
            <div className="Getstarted-Diet">
              <ul style={{ listStyle: 'circle' }}>
                <li>Free workout plans</li>
                <li>Know your workout</li>
                <li>Home/gym workouts</li>
                <li>Achieve your goal</li>
              </ul>
              <div className="smallscreen">
                Create Your Personalised Exercise Plan
              </div>
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
              <div className="smallscreen">
                Create Your Personalised Diet Plan
              </div>
              <div className="buttonDiv">
                <Link to='/diet'><Button variant='warning'>Get Start <img src={dieticon} alt="icon"></img></Button></Link>
              </div>
            </div>
          </div>

          <h5>Hey {userDetails?.username}! Please see your fitness status.</h5>
          <div className="cards">
            <div className="card1">
              <h6>BMI
                <br />
                (Body Mass Index)</h6>
              <p>
                <strong>{BMI}</strong>
              </p>
            </div>
            <div className="card1">
              <h6>BMR
                <br />
                (Basal Metabolic Rate)</h6>
              <p>
                <strong>
                  {
                    (userDetails.gender === 'male') ? (BMRMen) : (BMRWomen)
                  } calories/day
                </strong>
              </p>
            </div>
            <div className="card1">
              <h6>BFP
                <br />
                (Body Fat Percentage)</h6>
              <p>
                <strong className=''>
                  {
                    (userDetails.gender === 'male') ? (BFPMen) : (BFPWomen)
                  } %
                </strong>
              </p>
            </div>
            <div className="card1">
              <h6>IBW
                <br />
                (Ideal Body Weight)</h6>
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
      </div>
    </div>
  )
};