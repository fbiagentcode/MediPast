import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

const Navigation = () => {
  return (
    
    <nav className="nav">
      
      
      <ul>
        <div className='logobox' >
        <img src='logo.jpg' alt='logo' className='logo'></img>
        </div>

        <h2 className='medipast'>MEDIPAST</h2>
   
        <li>
          <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
        </li>
        <li>
          <NavLink to="/about" activeClassName="active-link">About us</NavLink>
        </li>
        <li>
          <NavLink to="/services" activeClassName="active-link">Services</NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active-link">Contact</NavLink>
        </li>
        <li>
          <NavLink to="/contact" activeClassName="active-link">Logout</NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Navigation;
