import React from 'react';
import './SearchBar.css';

function SearchBar() {
  return (
    <div className="search-bar">
      <input type="text" placeholder="Search" />
      <button>Search</button>
      <div className="search-filters">
        <select>
          <option>Timeline</option>
          <option>Last 24 hours</option>
          <option>Last week</option>
          <option>Last month</option>
        </select>
        <select>
          <option>Flag</option>
          <option>Green</option>
          <option>Yellow</option>
          <option>Red</option>
        </select>
        <select>
          <option>Location</option>
          <option>Location A</option>
          <option>Location B</option>
          <option>Location C</option>
        </select>
        <input type="text" placeholder="Description" />
        <div className="checkbox-container">
          <input type="checkbox" id="violation" />
          <label htmlFor="violation">In violation?</label>
        </div>
      </div>
    </div>
  );
}

export default SearchBar;
