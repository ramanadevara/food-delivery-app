import React from "react"
import "./Header.css"

const Header = () => {
  return (
    <div className='header'>
      <div className='header-contents'>
        <h2> Order your food here</h2>
        <p>
          Choose from this diverse menu featuring delicious dishes crafted with
          love.
        </p>
        <button>
          <a href='#explore-menu'>View Menu</a>
        </button>
      </div>
    </div>
  )
}

export default Header
