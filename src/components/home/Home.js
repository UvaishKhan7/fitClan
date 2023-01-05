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
                  (BMI <= 18.5) ? 'yellow'
                    : (BMI >= 18.6 && BMI <= 24.9) ? 'green'
                      : (BMI >= 25 && BMI <= 29.9) ? 'yellow'
                        : (BMI >= 30) ? 'red'
                          : 'text-white'
                }>{BMI}</strong>
              </p>
            </div>
            <div className="card1">
              <h6>BMR
                <br />
                (Basal Metabolic Rate)</h6>
              <p>
                <strong className="green">
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
                      (1 >= BFPMen) ? 'red'
                        : (BFPMen >= 2 && BFPMen <= 5) ? 'yellow'
                          : (BFPMen >= 6 && BFPMen <= 17) ? 'green'
                            : (BFPMen >= 18 && BFPMen <= 24) ? 'yellow'
                              : (BFPMen >= 25) ? 'red'
                                : 'text-white'
                    }>{BFPMen} %</strong>

                    /* Using different font colors according to female fat class */
                    : <strong className={
                      (9 >= BFPWomen) ? 'red'
                        : (BFPWomen >= 10 && BFPWomen <= 13) ? 'yellow'
                          : (BFPWomen >= 14 && BFPWomen <= 24) ? 'green'
                            : (BFPWomen >= 25 && BFPWomen <= 31) ? 'yellow'
                              : (BFPWomen >= 32) ? 'red'
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
                  (BMI <= 18.5) ? 'yellow'
                    : (BMI >= 18.6 && BMI <= 24.9) ? 'green'
                      : (BMI >= 25 && BMI <= 29.9) ? 'yellow'
                        : (BMI >= 30) ? 'red'
                          : 'text-white'
                }>
                  {
                    (userDetails.gender === 'male') ? (IBWMen) : (IBWWomen)
                  } Kg
                </strong>
              </p>
            </div>
          </div>
          <div className="description">
            <div className="details">
              <ul><h6>If Your BMI Is :</h6>
                <li className="yellow">Below 18.5 - You're in the underweight range</li>
                <li className="green">Between 18.5 and 24.9 - You're in the healthy weight range</li>
                <li className="yellow">Between 25 and 29.9 - You're in the overweight range</li>
                <li className="red">30 or over - You're in the obese range</li>
              </ul>
            </div>
            <div className="details calories">
              <ul><h6>How many calories you need everyday ?</h6>
                <li>Sedentary. If you get minimal or no exercise, multiply your BMR by 1.2</li>
                <li>Lightly active. If you exercise lightly one to three days a week, multiply your BMR by 1.375</li>
                <li>Moderately active. If you exercise moderately three to five days a week, multiply your BMR by 1.55</li>
                <li>Very active. If you engage in hard exercise six to seven days a week, multiply your BMR by 1.725</li>
                <li>Extra active. If you engage in very hard exercise six to seven days a week or have a physical job, multiply your BMR by 1.9</li>
              </ul>
            </div>
          </div>
          <div className="bfp_description">
            <div className="bfp_details">
              <ul><h6>Body Fat Percentage for Men:</h6>
                <li className="yellow">Essential Fat = 2-5%</li>
                <li className="green">Athletes = 6-13%</li>
                <li className="green">Fitness = 14-17%</li>
                <li className="yellow">Acceptable = 18-24%</li>
                <li className="red">Obesity &gt;= 25</li>
              </ul>
            </div>
            <div className="bfp_details">
              <ul><h6>Body Fat Percentage for Women:</h6>
                <li className="yellow">Essential Fat = 10-13%</li>
                <li className="green">Athletes = 14-20%</li>
                <li className="green">Fitness = 21-24%</li>
                <li className="yellow">Acceptable = 25-31%</li>
                <li className="red">Obesity &gt;= 32</li>
              </ul>
            </div>
          </div>
          <div className="bfp_description">
            <div className="bfp_details_age">
              <ul><h6>Ideal Body Fat Percentage for Men According to Their Age:</h6>
                <li>20-39 Years : 8-19%</li>
                <li>40-59 Years : 11-21%</li>
                <li>60-79 Years : 13-24%</li>
              </ul>
            </div>
            <div className="bfp_details_age">
              <ul><h6>Ideal Body Fat Percentage for Women According to Their Age:</h6>
                <li>20-39 Years : 21-32%</li>
                <li>40-59 Years : 23-33%</li>
                <li>60-79 Years : 24-35%</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div >
  )
};