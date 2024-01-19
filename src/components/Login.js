import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [credentials, setCredentials] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setCredentials({ ...credentials, email: e.target.value });
  };

  const handlePasswordChange = (e) => {
    setCredentials({ ...credentials, password: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Login form submitted');
    
    try {
      const response = await fetch('http://localhost:4000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: credentials.email, password: credentials.password }),
      });
  
      if (!response.ok) {
        // Check if response status is not okay, then throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
  
      if (json.success) {
        // Save the auth token and redirect
        localStorage.setItem('token', json.authToken);
        navigate('/home');
        console.log('Successfully logged in');
      } else {
        alert('Invalid Credentials');
      }
    } catch (error) {
      console.error('Error during login:', error.message);
      alert('Invalid credentials.');
    }
  };


  return (
    <div className="p-6 text-white flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="w-[450px] bg-transparent p-6 rounded shadow">
          <h1 className="text-white text-2xl font-bold  mb-6 text-center">Login to LangLearn</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white text-custom-black rounded px-3 py-2 focus:outline-0"
                value={credentials.email}
                onChange={handleEmailChange}
            aria-describedby='emailHelp'
          />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white font-bold mb-2">
                Password
              </label>
              <input
            type='password'
            value={credentials.password}
            className="w-full bg-white text-custom-black rounded px-3 py-2 focus:outline-0"
            onChange={handlePasswordChange}
            id='password'
          />
            </div>
            <div className="flex justify-center items-center text-xs my-2">
              <span className="text-gray-400">Don't have an account?</span>&nbsp;&nbsp;
              <span
                className="text-white font-bold cursor-pointer"
                onClick={() => navigate("/signup")}
              >
                Sign Up
              </span>
            </div>
          

            <button
              type="submit"
              className="w-full bg-[#CFD724] text-[#152039] rounded py-2 hover:bg-white hover:text-custom-black"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
