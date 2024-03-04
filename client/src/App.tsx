import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/css/main.css';
import '../src/css/animations.css';
import translateIcon from '../src/images/translate_icon.svg';
import itGirlImage from '../src/images/IT-girl.jpg';
import Navbar from './components/navbar';
import HomeContent from './components/homeContent';
import AboutContent from './components/aboutContent';
import ContactContent from './components/contactContent';
import Login from './components/login';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectContent from './components/projectContent';



function App() {
  const [language, setLanguage] = useState('en'); // Default language

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage); 
  };

  return (
    <div className="full-height h-100">
      <BrowserRouter>
        <Navbar onLanguageChange={handleLanguageChange} />
        <Routes>
          <Route path="/">
            <Route index element={< HomeContent />} />

            <Route path='about' element={< AboutContent />} />

            <Route path='contact' element={< ContactContent />} />

            <Route path='projects' element={< ProjectContent /> } />

            <Route path='adminlogin' element={< Login /> } />

          </Route>

        </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
