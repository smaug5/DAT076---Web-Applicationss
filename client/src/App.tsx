import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/css/main.css';
import '../src/css/animations.css';
import translateIcon from '../src/images/translate_icon.svg';
import itGirlImage from '../src/images/IT-girl.jpg';
import Navbar from './components/navbar';
import homeContent from './components/homeContent';


function App() {
    const [language, setLanguage] = useState('en'); // Default language
  
    const handleLanguageChange = (newLanguage: string) => {
      setLanguage(newLanguage); 
    };
  return (
    <div>
      <Navbar onLanguageChange={handleLanguageChange} />
      {homeContent()}
    </div>
  );
}

export default App;
