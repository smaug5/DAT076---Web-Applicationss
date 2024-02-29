import React, { useState, useEffect } from 'react';
import logo from './logo.svg';
import logo2 from './logo2.svg';
import './App.css';
import '../src/css/main.css';
import '../src/css/animations.css';
import translateIcon from '../src/images/translate_icon.svg';
import itGirlImage from '../src/images/IT-girl.jpg';
import axios, { AxiosResponse } from 'axios';

interface Project {
  title : string,
  description : string,
  //imageID : number,
  url ?: string;
}



function App() {
  const [theProjectList, setProjectList] = useState<Project[]>([]);

  async function updateProjects() {
    // TODO Make the URL variable
    setTimeout(async () => {
      try {
        const response = await axios.get<Project[]>("http://localhost:8080/api/project")
        console.log(response.data);
        const newProjects : Project[] = response.data;
        setProjectList(newProjects);
      } catch (error : any) {
        console.log(error)
      }
    
    }, 1000);
  }

  useEffect(() => {
    updateProjects();
  }, [])

  updateProjects();
  
  return (
    <div>
      {navBar()}
      <h1>Projects</h1>
      <PortfolioContent projects = {theProjectList}/>
      {/* {mainContent()} */}
    </div>
  );
}

export function navBar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light navbar-custom">
      <div className="container-fluid">
        <div className="collapse navbar-collapse navbar-custom-icon" id="navbarToggle">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0 navbar-custom-icon">
            <li className="nav-item dropdown">
              <button className="nav-link" data-toggle="dropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false" style={{ background: 'none', border: 'none', padding: 0 }}>
                <img src={translateIcon} alt="Dropdown" style={{ cursor: 'pointer' }} className="white-svg" />
              </button>
              <ul className="dropdown-menu">
                <li><a className="dropdown-item" href="#">Svenska</a></li>
                <li><a className="dropdown-item" href="#">Engelska</a></li>
                <li><a className="dropdown-item" href="#">Latin</a></li>
              </ul>
            </li>
          </ul>
        </div>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarToggle" aria-controls="navbarToggle" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse align-navitems" id="navbarNavAltMarkup">
          <div className="navbar-nav align-navitems">
            <a className="nav-link active" aria-current="page" href="index.html">Home</a>
            <a className="nav-link" href="about.html">About</a>
            <a className="nav-link" href="#">Contact</a>
            <a className="nav-link disabled" aria-disabled="true">Portfolio</a>
          </div>
        </div>
      </div>
    </nav>
  )
}

export function mainContent() {
  return (
    <div className="container-fluid h-100 mainBackground">
      <div className="row h-100">
        <div className="col-6 d-flex flex-column">
          <div className="half-box">INNEHÅLL</div>
          <div className="half-box">INNAHALL</div>
        </div>
        <div className="col-6 right centered-image">
          <img src={itGirlImage} alt="Logo" className="bit-girl" />
        </div>
      </div>
    </div>
  );
}


function PortfolioContent({ projects } : { projects : Project[] }) {
  return(
    <ul>
      {projects.map((project : Project) =>
      <li key={project.title}>{project.title} <br/> <img src={logo} alt="Logo" width="200px" /></li>
      )}
    </ul>
  );
}

export default App;
