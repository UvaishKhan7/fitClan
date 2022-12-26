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
import ProtectedRoute from "./ProtectedRoute";

function App() {

  return (
    <div className="App">
      <UserAuthContext>
        <Header />
        <Routes>
          <Route path='/' element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          } />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          } />
          <Route path='/diet' element={
            <ProtectedRoute>
              <Diet />
            </ProtectedRoute>
          } />
          <Route path='/exercise' element={
            <ProtectedRoute>
              <Exercise />
            </ProtectedRoute>
          } />
        </Routes>
        
        <Footer />
      </UserAuthContext>
    </div>
  );
}

export default App;
