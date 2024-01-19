import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const [credentials, setCredentials] = useState({ name: "", email: "", password: "", confirmPassword: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Signup form submitted');

    const { name, email, password } = credentials;

    try {
      const response = await fetch('http://localhost:4000/api/auth/createuser', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        // Check if response status is not okay, then throw an error
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const json = await response.json();
      console.log(json);

      if (json.success) {
        // Save the auth token and user information
        localStorage.setItem('token', json.authToken);
        localStorage.setItem('name', name); // Save the user's name
        navigate('/home');
        console.log('Successfully created a user');
      } else {
        alert('User already exists. Please login.');
      }
    } catch (error) {
      console.error('Error during signup:', error.message);
      alert('User already exists. Please login.');
    }
  };

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };


  return (
    <div className="p-6 text-white flex justify-center items-center min-h-screen">
      <div className="flex justify-center items-center h-full">
        <div className="w-[450px] bg-transparent p-6 rounded shadow">
          <h1 className="text-2xl font-bold mb-6 text-center">Sign Up for Web Quest</h1>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <label htmlFor="name" className="block text-white font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full bg-white text-custom-black rounded px-3 py-2 focus:outline-0"
                name="name"
                onChange={onChange}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block text-white font-bold mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="w-full bg-white text-custom-black rounded px-3 py-2 focus:outline-0"
                aria-describedby="emailHelp" 
                name="email"
                onChange={onChange} 
                minLength={5}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="password" className="block text-white font-bold mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                className="w-full bg-white text-custom-black rounded px-3 py-2 focus:outline-0"
                name="password"
                onChange={onChange} required 
      
              />
            </div>
            <div className="flex justify-center items-center text-xs my-2">
              <span className="text-gray-400">Already have an account?</span>
              &nbsp;&nbsp;
              <span
                className="text-white font-bold cursor-pointer hover:underline"
                onClick={() => navigate("/")}
              >
                Login
              </span>
            </div>
           

            <button
              type="submit"
              className="w-full bg-[#CFD724] text-[#152039] rounded py-2 hover:text-custom-black hover:bg-white"
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
