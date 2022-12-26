//import { Avatar, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import Banner from '../../assets/Banner.gif';
import LOGO from '../../assets/logo.png';
import './header.css';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { UserAuth } from '../../UserAuthContext';
import { collection, onSnapshot, query } from 'firebase/firestore';
import db from '../../firebase';

function Header() {

  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [userDetails, setUserDetails] = useState({});
  
  const handleLogout = async () => {
    try {
      await logout();
      navigate('/')
    } catch (e) {
      console.log(e.message)
    }
  }

  useEffect(() => {
    const q = query(collection(db, 'user'));
    const unsub = onSnapshot(q, (snapshot) => {
      snapshot.forEach((doc) => {
        setUserDetails({
          ...doc.data(),
          id: doc.id
        })        
      });
    })
    return () => unsub();
  }, []);

  return (
    <div className='headerWrapper'>
      <img src={Banner} alt="" className='banner img-fluid' />
      <img src={LOGO} alt="" className='logo' />
      <div className='headerContainer'>
        <Navbar bg="dark" variant="dark" className='px-2' sticky='top' expand="sm" collapseOnSelect>
          <Link to='/'>
            <Navbar.Brand id='title'>FIT-CLAN</Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto navTitles">
              <Nav.Item>
                <Nav.Link eventKey="1" as={Link} to="/exercise">
                  Exercise Plans
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link eventKey="2" as={Link} to="/diet">
                  Diet Plans
                </Nav.Link>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Collapse className="justify-content-end">
            <Navbar.Text className='navTitles'>
              {
                !(user) ? <Link to='/login'>LOGIN</Link> :
                  (<NavDropdown id="nav-dropdown-dark-example" title={`Hello ${userDetails && userDetails.username}`} menuVariant="dark">
                    <NavDropdown.Item as={Link} to='/account'>
                      Account
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item onClick={handleLogout}>
                      Logout
                    </NavDropdown.Item>
                  </NavDropdown>)
              }
            </Navbar.Text>
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;