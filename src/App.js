import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';
import NavBar from './components/NavBar';
import LangSelectPage from './components/LangSelectPage'
import Profile from './components/Profile';


function App() {
  return (
    <div>
      <div className='app'>
        <NavBar/>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/language-selection" element={<LangSelectPage/>} />
            <Route path="/profile" element={<Profile/>} />
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
