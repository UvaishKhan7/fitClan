import React from 'react';
import './landingPage.css';
import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom';

export default function LandingPage() {

  return (
    <section className='landing'>
      <div className="landing__outer">
        <div className="exerciseDetails">
          <img src={Logo} alt="logo" />
          <h1>FIT-CLAN</h1>
          <ul>
            <li>Achieve Your Fitness Goal Without Paying Anything.</li>
            <li>Create Your Personalised Exercise Plans.</li>
            <li>Create Your Personalised Diet Plans.</li>
            <li>Calculate BMI, BMR, BFP, IBW etc.</li>
            <li>Get The Nutrition Details Of Food Items.</li>
          </ul>
        </div>
        <div className="login_btn">
          <Link to='/signup'>
            <button>Signup</button>
          </Link>
          <Link to='/login'>
            <button>Login</button>
          </Link>
        </div>
      </div>
    </section>
  )
};