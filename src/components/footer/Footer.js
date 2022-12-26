import React from 'react';
import './footer.css';
import { GrInstagram, GrTwitter } from 'react-icons/gr';
import { ImFacebook2, ImYoutube } from 'react-icons/im';
import Logo from '../../assets/logo.png';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <div className='footerWrapper'>
      <div className="footerUpper d-flex justify-content-around mt-3 align-items-center">
        <div className="goal">
          <img src={Logo} alt="logo" className='footer_logo' />
          <p>Our goal is to keep you fit.</p>
        </div>
        <div className="text-center subscribe">
          <Link className='abt' to="/about">ABOUT US</Link>
          <Link className='cnt' to="/contact">CONTACT US</Link>
        </div>
        <div className="socialMedia">
          <h6 className='fw-bold'>FOLLOW US</h6>
          <div className="socialIcons">
            <a href="http://www.instagram.com" target="_blank" rel="noopener noreferrer"><GrInstagram className='instaIcon' /></a>
            <a href="http://www.facebook.com" target="_blank" rel="noopener noreferrer"><ImFacebook2 className='fbIcon' /></a>
            <a href="http://www.twitter.com" target="_blank" rel="noopener noreferrer"><GrTwitter className='twIcon' /></a>
            <a href="http://www.youtube.com" target="_blank" rel="noopener noreferrer"><ImYoutube className='ytIcon' /></a>
          </div>
        </div>
        <div className="call">
          <h6 className='fw-bold'>CALL US</h6>
          <h5><a href="tel:+919876543210" className='phone'>+919876543210</a></h5>
        </div>
      </div>
      <div className="devider"></div>
      <div className="footerLower">
        <small>&#169; 2022. Design & Developed by Uvaish & Habeeb. All Rights Reserved.</small>
      </div>
    </div>
  )
}