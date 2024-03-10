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
//import Login from './components/login';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectContent from './components/projectContent';
import AdminManagerPage from './components/adminManagerPage';
import { get } from 'http';


function App() {
  const [language, setLanguage] = useState('en'); // Default language

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage); 
  };

  const [isModalVisible, setIsModalVisible] = useState(false)

  const toggleModal = () => {
    setIsModalVisible(wasModalVisible => !wasModalVisible)
  }

  return (
    <div className="full-height h-100" style={{ overflow: 'auto' }} >
      <BrowserRouter>
        <Navbar onLanguageChange={handleLanguageChange} />
        <div className="content-container full-height h-100">
        <Routes>
          <Route path="/">
            <Route index element={< HomeContent />} />

            <Route path='about' element={< AboutContent />} />

            <Route path='contact' element={< ContactContent />} />

            <Route path='projects' element={< ProjectContent /> } />

            <Route path='adminManagerPage' element={< AdminManagerPage />} />

          </Route>

        </Routes>
        </div>

      </BrowserRouter>
    </div>
  );
}

export default App;
