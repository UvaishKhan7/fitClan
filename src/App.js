import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";
import Signup from "./components/signup/Signup";
import UserAuthContext from "./UserAuthContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import Login from "./components/login/Login";
import Account from "./components/account/Account";
import Diet from "./components/diet/Diet";
import Exercise from "./components/exercise/Exercise";
import ProtectedRoute, { AuthenticatedRoute } from "./ProtectedRoute";
import LandingPage from "./components/LandingPage/LandingPage";
import Banner from './assets/Banner.gif';
import LOGO from './assets/logo.png';
import AllPlans from "./components/exercise/allPlans/AllPlans";

export default function App() {

  return (

    <div className="App">

      <UserAuthContext>
        <img src={Banner} alt="" className='banner img-fluid' />
        <img src={LOGO} alt="" className='logo' />
        <Header />

        <Routes>

          {/* ============ Added Protected Route for Home ============ */}
          <Route path='/' element={
            <ProtectedRoute >
              <Home />
            </ProtectedRoute>
          } />

          {/* ============ Added Authenticated Route for Signup ============ */}
          <Route path='/signup' element=
            {
              <AuthenticatedRoute>
                <Signup />
              </AuthenticatedRoute>
            } />

          {/* ============ Added Authenticated Route for Landing Page ============ */}
          <Route path='/landing' element=
            {
              <AuthenticatedRoute>
                <LandingPage />
              </AuthenticatedRoute>
            } />

          {/* ============ Added Authenticated Route for Login ============ */}
          <Route path='/login' element=
            {
              <AuthenticatedRoute>
                <Login />
              </AuthenticatedRoute>
            } />

          {/* ============ Added Protected Route for Account ============ */}
          <Route path='/account' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />

          {/* ============ Added Protected Route for Diet ============ */}
          <Route path='/diet' element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          } />

          {/* ============ Added Protected Route for Exercise ============ */}
          <Route path='/exercise' element={
            <ProtectedRoute>
              <Exercise />
            </ProtectedRoute>
          } />

          {/* ============ Added Protected Route for All Exercise ============ */}
          <Route path='/exercise/all_plans' element={
            <ProtectedRoute>
              <AllPlans />
            </ProtectedRoute>
          } />

        </Routes>

        <Footer className='footer' />

      </UserAuthContext>
    </div>
  );
};

