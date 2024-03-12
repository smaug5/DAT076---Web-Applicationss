import { useState } from 'react';
import './App.css';
import '../src/css/main.css';
import '../src/css/animations.css';
import Navbar from './components/navbar';
import HomeContent from './components/homeContent';
import AboutContent from './components/aboutContent';
import ContactContent from './components/contactContent';
//import Login from './components/login';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import ProjectContent from './components/projectContent';
import AdminManagerPage from './components/adminManagerPage';


function App() {
  const [language, setLanguage] = useState('en'); // Default language

  const handleLanguageChange = (newLanguage: string) => {
    setLanguage(newLanguage); 
  };

  return (
    <div className="full-height h-100" >
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
