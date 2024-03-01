import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import '../src/css/main.css';
import '../src/css/animations.css';
import translateIcon from '../src/images/translate_icon.svg';
import itGirlImage from '../src/images/IT-girl.jpg';
import Navbar from './components/navbar';
import HomeContent from './components/homeContent';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';



function App() {
    const [language, setLanguage] = useState('en'); // Default language
  
    const handleLanguageChange = (newLanguage: string) => {
      setLanguage(newLanguage); 
    };
  return (
    <div>
      <Navbar onLanguageChange={handleLanguageChange} />
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route index element={<HomeContent />} />

            <Route path='explorer' element={< HomeContent />} />

          </Route>

        </Routes>

      </BrowserRouter>
      {HomeContent()}
    </div>
  );
}

export default App;
