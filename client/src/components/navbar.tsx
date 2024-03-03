
import React, { useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import { Link } from 'react-router-dom';


const Navbar = ({ onLanguageChange }: { onLanguageChange: (language: string) => void }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
        <div className="container-fluid">
          <div className="collapse navbar-collapse navbar-custom-icon" id="navbarToggle">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-custom-icon">
              <li className="nav-item dropdown">
                <button className="nav-link" onClick={toggleDropdown} aria-expanded={isDropdownOpen} style={{ background: 'none', border: 'none', padding: 0 }}>
                  <img src={translateIcon} alt="Dropdown" style={{ cursor: 'pointer' }} className="white-svg" />
                </button>
                <ul className={`dropdown-menu${isDropdownOpen ? ' show' : ''}`}>
                    <li><button className="dropdown-item" onClick={() => onLanguageChange('sv')}>Svenska</button></li>
                    <li><button className="dropdown-item" onClick={() => onLanguageChange('en')}>Engelska</button></li>
                    <li><button className="dropdown-item" onClick={() => onLanguageChange('la')}>Latin</button></li>
                </ul>
              </li>
            </ul>
          </div>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
  
          <div className="collapse navbar-collapse align-navitems" id="navbarNavAltMarkup">
            <div className="navbar-nav align-navitems">
                <Link className="nav-link" to="/">Home</Link>
                <Link className="nav-link" to="/about">About</Link>
                <Link className="nav-link" to="/contact">Contact</Link>
                <Link className="nav-link" to="/projects">Projects</Link>
            </div>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;