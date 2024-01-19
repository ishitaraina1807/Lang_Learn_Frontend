import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function Profile() {
    const [highestScore, setHighestScore] = useState(0);
    const name = localStorage.getItem('name');

    useEffect(() => {
        // Fetch highest score from the backend API
        const fetchHighestScore = async () => {
            try {
                const response = await fetch('http://localhost:4000/api/highestScore/save-highest-score', {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    // You can add other necessary headers or parameters
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const result = await response.json();
                setHighestScore(result.highestScore);
            } catch (error) {
                console.error('Error fetching highest score:', error.message);
            }
        };

        fetchHighestScore();
    }, []);
    return (
        <div>
            <div className="p-16"><div className="p-8 bg-white shadow mt-5">
                <div className="grid grid-cols-1 md:grid-cols-3">
                    <div className="grid grid-cols-3 text-center order-last md:order-first mt-20 md:mt-0"> 
                    </div>
                    <div className="relative">
                        <div className="w-48 h-48 bg-[#CFD724] mx-auto rounded-full shadow-2xl absolute inset-x-0 top-0 -mt-24 flex items-center justify-center text-[#152039]">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24" viewBox="0 0 20 20" fill="currentColor">  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                        </div>
                    </div>
                    <div className="space-x-8 flex justify-between mt-32 md:mt-0 md:justify-center">
                        <Link to="/language-selection" className="text-white py-2 px-4 uppercase rounded bg-[#CFD724] hover:bg-[#CFD731] shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">Continue Learning</Link>
                        <Link to="/" className="text-white py-2 px-4 uppercase rounded bg-[#152039] hover:bg-gray-800 shadow hover:shadow-lg font-medium transition transform hover:-translate-y-0.5">  Log Out</Link>
                    </div>
                </div>
                <div className="mt-20 text-center border-b pb-12">
                    <h1 className="text-4xl font-medium text-gray-700">{name}</h1>   
                    <h2 className="text-2xl mt-8 font-medium text-gray-700">Leadership Board</h2> 
                    <p className="mt-2 text-gray-500">English: <span>Level 2</span></p>
                    <p className="mt-2 text-gray-500">Spanish: <span>Level 1</span></p>
                </div>  <div className="mt-8 flex flex-col justify-center">
                <h2 className="text-2xl font-medium text-gray-700 text-center">Current Score: <span>{highestScore}</span></h2>
                    <button className="text-indigo-500 py-2 px-4  font-medium mt-4"> Reset Progress</button>
                </div>
            </div>
            </div>
        </div>
    )
}
