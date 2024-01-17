import React from 'react';
import './App.css';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Home from './components/Home';

function App() {
  return (
    <div>
      <div className='app'>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp/>} />
          </Routes>
      </div>
    </div>
  );
}

export default App;
