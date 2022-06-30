import React from 'react'
import './index.css'
function Header({rejectAll, handleSortType, handleMaxCost, handleMaxTime}) {
  return (
    <div className='header-container'>
          <div className='reject-all-container'>
            <button onClick={rejectAll}>Reject All</button>
          </div>
          <div className='menu-container'>
            <label>
              Sort by
              <select onChange={(e) => handleSortType(e.target.value)}>
                <option value='shortest'>
                  Shortest Time
                </option>
                <option value='longest'>
                  Longest Time
                </option>
                <option value='high'>
                  Price (High to Low)
                </option>
                <option value='low'>
                  Price (Low to High)
                </option>
              </select>
            </label>
          </div>
          <div className='menu-container'>
            <label>
              Max Cost
              <select onChange={(e) => handleMaxCost(e.target.value)}>
                <option value='all'>
                  $100 Million
                </option>
                <option value='half'>
                  $50 Million
                </option>
                <option value='ten'>
                  $10 Million
                </option>
                <option value='five'>
                  $5 Million
                </option>
              </select>
            </label>
          </div>
          <div className='menu-container'>
            <label>
              Max Time
              <select onChange={(e) => handleMaxTime(e.target.value)}>
                <option value='max'>
                  24 Months
                </option>
                <option value='year'>
                  12 Months
                </option>
                <option value='half'>
                  6 Months
                </option>
                <option value='quarter'>
                  3 Months
                </option>
              </select>
            </label>
          </div>
        </div>
  )
}

export default Header