import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import spain from './icons/spain.png'
import uk from './icons/uk.png'

export default class LangSelectPage extends Component {
  render() {
    return (
      <div>
        <main className="mx-auto max-w-7xl grid min-h-full mx-auto mt-28 bg-transparent">
        <div className="text-left w-1 md:w-1/2 bg-[#F5F5F5] rounded-xl p-16">
          <h1 className="text-3xl font-bold tracking-tight text-[#152039] sm:text-3xl text-center">Select Your Category of Choice</h1>
          <div className="mt-10 flex items-center justify-left gap-x-6">
          <Link
                    to="/learn-english"
                    className="rounded-md shadow-lg bg-[#CFD724] transform hover:scale-110 transition duration-300 px-3.5 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-custom-magenta focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                  >
                    <img src={uk} alt="uk-flag" />
                    English
                  </Link>
                  <Link
                    to="/learn-spanish"
                    className="rounded-md shadow-lg bg-[#CFD724] transform hover:scale-110 transition duration-300 px-3.5 py-3.5 text-lg font-semibold text-white shadow-sm hover:bg-custom-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" 
                  >
                    <img src={spain} alt="spain-flag" />
                    Spanish
                  </Link>
          </div>
        </div>
      </main>
      </div>
    )
  }
}
