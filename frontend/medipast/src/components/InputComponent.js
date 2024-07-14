import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import '../InputComponent.css'; // Import CSS for styling (create this file)

const InputComponent = () => {
  const navigate = useNavigate();


  const [searchValue, setSearchValue] = useState('');

  function searchUser(username){
    navigate(`/users/${username}`);
  }

  const handleChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleClear = () => {
    setSearchValue('');
  };

  return (
    <div className="input-wrapper">
      <input
        type="text"
        name="searchUser"
        value={searchValue}
        onChange={handleChange}
        placeholder="Search for a patient..."
        className="input-field"
      />
      <FontAwesomeIcon icon={faSearch} className="search-icon" onClick= { () => searchUser(searchValue) }/>
      {searchValue && (
        <button className="clear-button" onClick={handleClear}>
          &#x2715; {/* Close icon */}
        </button>
      )}
    </div>
  );
};

export default InputComponent;
