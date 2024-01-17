import React, { Component } from 'react'
import { Link } from 'react-router-dom';

export default class Introduction extends Component {
  render() {
    return (
      <div>
        <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 container mt-36 transition-all duration-1000">
          <h1 className='pb-5'>Learn a Language while playing these fun quizzes!</h1>
          <h2>Welcome to our engaging quizzes for Language Learning! If you are a beginner taking your first steps into a new language, our quizzes are tailored to challenge and educate you to that new language you want to learn.</h2>
          <div className="mt-10 flex items-center justify-right gap-x-6">
            <Link to="/language-selection" className="rounded-md bg-white px-5 py-2.5 text-md font-semibold text-[#152039] transform hover:scale-110 hover:bg-[#CFD724] transition duration-300">Start Learning <span aria-hidden="true">→</span> </Link>
          </div>
        </div>
      </div>
    )
  }
}