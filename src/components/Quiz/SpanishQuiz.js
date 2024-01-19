import React from 'react'
import { Link } from 'react-router-dom';

export default function SpanishQuiz() {
    return (
        <div className='flex flex-col justify-center items-center h-[550px]'>
            <h1 className='text-4xl font-bold text-white'>Upcoming feature</h1>
            <Link to="/profile" className="flex items-center justify-center hover:scale-110 text-white mx-auto hover:text-[#CFD724] transition duration-300 hover:cursor-pointer">
                <div
                    className="w-10 h-10"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"> <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" /></svg>
                </div>
                <p>View your Profile</p>
            </Link>
        </div>
    )
}
