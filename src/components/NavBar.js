import React from 'react'

function NavBar() {
    return (
      <div>
        <nav className='border-b '>
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 relative flex h-16 items-center justify-between">
            <div className="flex flex-shrink-0 items-center">
              <h1 className='text-white text-2xl'>Web Quest</h1>
            </div>
            <div className="hidden sm:ml-6 sm:block">
            </div>
          </div>

          <div className="sm:hidden" id="mobile-menu">
          </div>
        </nav>
      </div>
    )
  }

  export default NavBar;
