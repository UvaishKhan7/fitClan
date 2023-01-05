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
                <strong className={
                  (BMI <= 18.5) ? 'text-info'
                    : (18.6 <= BMI <= 24.9) ? 'text-success'
                      : (25 <= BMI <= 29.9) ? 'text-warning'
                        : (30 <= BMI) ? 'text-danger'
                          : 'text-white'
                }>{BMI}</strong>
              </p>
            </div>
            <div className="card1">
              <h6>BMR
                <br />
                (Basal Metabolic Rate)</h6>
              <p>
                <strong className="text-success">
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

                {
                  /* Using different font colors according to male fat class */
                  (userDetails.gender === 'male')
                    ? <strong className={
                      (BFPMen <= 1) ? 'text-danger'
                        : (2 <= BFPMen <= 5) ? 'text-info'
                          : (6 <= BFPMen <= 17) ? 'text-success'
                            : (18 <= BFPMen <= 24) ? 'text-warning'
                              : (25 <= BFPMen) ? 'text-danger'
                                : 'text-white'
                    }>{BFPMen} %</strong>

                    /* Using different font colors according to female fat class */
                    : <strong className={
                      (BFPWomen <= 9) ? 'text-danger'
                        : (10 <= BFPWomen <= 13) ? 'text-info'
                          : (14 <= BFPWomen <= 24) ? 'text-success'
                            : (25 <= BFPWomen <= 31) ? 'text-warning'
                              : (32 <= BFPWomen) ? 'text-danger'
                                : 'text-white'
                    }>{BFPWomen} %</strong>
                }

              </p>
            </div>
            <div className="card1">
              <h6>IBW
                <br />
                (Ideal Body Weight)</h6>
              <p>
                <strong className={
                  (BMI <= 18.5) ? 'text-info'
                    : (18.6 <= BMI <= 24.9) ? 'text-success'
                      : (25 <= BMI <= 29.9) ? 'text-warning'
                        : (30 <= BMI) ? 'text-danger'
                          : 'text-white'
                }>
                  {
                    (userDetails.gender === 'male') ? (IBWMen) : (IBWWomen)
                  } Kg
                </strong>
              </p>
            </div>
          </div>
          <div className="bmr_details">
            <ul><h6>If Your BMI Is :</h6>
              <li>Below 18.5 - You're in the underweight range</li>
              <li>Between 18.5 and 24.9 - You're in the healthy weight range</li>
              <li>Between 25 and 29.9 - You're in the overweight range</li>
              <li>30 or over - You're in the obese range</li>
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
};