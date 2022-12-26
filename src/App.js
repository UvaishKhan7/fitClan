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

function App() {

  return (
    <div className="App">
      <UserAuthContext>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          <Route path='/account' element={<Account />} />
          <Route path='/diet' element={<Diet />} />
        </Routes>
        <Footer />
      </UserAuthContext>
    </div>
  );
}

export default App;
