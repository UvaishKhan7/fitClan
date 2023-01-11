//import { Avatar, Button } from '@mui/material';
import React from 'react';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import './header.css';
import { UserAuth } from '../../UserAuthContext';
import Dropdown from 'react-bootstrap/Dropdown';

function Header() {

  const { user, userDetails, logout } = UserAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/login')
    } catch (e) {
      console.log(e.message)
    }
  }

  return (
    <div className='headerWrapper'>
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
            {
              !(user) ? <Link to='/login'>LOGIN</Link> :
                (<Dropdown>
                  <Dropdown.Toggle id="dropdown-button-dark-example1" variant="dark">
                    Logged in as : <strong>{userDetails?.username}</strong>
                  </Dropdown.Toggle>
                  <Dropdown.Menu variant="dark">
                    <Dropdown.Item as={Link} to='/account'>Account</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item onClick={handleLogout}>Logout</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                )
            }
          </Navbar.Collapse>
        </Navbar>
      </div>
    </div>
  );
}

export default Header;