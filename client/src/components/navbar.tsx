import { useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import { NavLink } from 'react-router-dom';

/**
 * Navbar component for navigation on the page, and language selection
 * @component
 * @param {Object} props - Component properties
 * @param {fuction} props.onLanguageChange - Callback function for language change
 */
const Navbar = ({ onLanguageChange }: { onLanguageChange: (language: string) => void }) => {
  // State to manage the visability of the language dropdown
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
    /**
     * Toggles the visibility of the language dropdown
     * @function
     */
    const toggleDropdown = () => {
      setIsDropdownOpen(!isDropdownOpen);
    };
  
    return (
      <nav className="navbar navbar-expand-lg navbar-light navbar-custom" >
        <div className="container-fluid">
          {/* Dropdown for Languange change */}
          <div className="collapse navbar-collapse navbar-custom-icon" id="navbarToggle">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-custom-icon">
              <li className="nav-item dropdown">
                {/* Button for language change in the dropdown */}
                <button className="nav-link" onClick={toggleDropdown} aria-expanded={isDropdownOpen} style={{ background: 'none', border: 'none', padding: 0 }}>
                  <img src={translateIcon} alt="Dropdown" style={{ cursor: 'pointer' }} className="white-svg" />
                </button>
                {/* Menu for language change */}
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

          {/* Links in the NavBar */}
          <div className="collapse navbar-collapse align-navitems " id="navbarNavAltMarkup">
            <div className="navbar-nav align-navitems ">
                {/* <Link className="nav-link" to="/" >Home</Link> */}
                <NavLink to="/" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Home </NavLink>
                {/* <Link className="nav-link" to="/about">About</Link> */}
                <NavLink to="/about" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>About </NavLink>
                {/* <Link className="nav-link" to="/contact">Contact</Link> */}
                <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Contact </NavLink>
                {/* <Link className="nav-link" to="/projects">Projects</Link> */}
                <NavLink to="/projects" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>Projects </NavLink>

            </div>
          </div>
        </div>
      </nav>
    );
  };

export default Navbar;