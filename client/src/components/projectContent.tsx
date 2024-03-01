
import React, { useEffect, useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import translateIcon from '../../src/images/translate_icon.svg';
import itGirlImage from '../../src/images/IT-girl.jpg';
import {project} from '../../../server/src/model/project'
import axios from 'axios';

export function projectContent({ projects } : { projects : project[] }) {

    const [theProjectList, setProjectList] = useState<project[]>([]);

    const handleProjectList = (newProjectList: project[]) => {
        setProjectList(newProjectList); 
    };

    useEffect(() => {
        updateProjects(handleProjectList);
    }, [])


    updateProjects(handleProjectList);
    
    return (
      <ul>
        {projects.map((oneProject : project) =>
        <li key={oneProject.title}>{oneProject.title} <br/> <img src={logo} alt="Logo" width="200px" /></li>
        )}
      </ul>
    );
}


export async function updateProjects(handleProjectList: (newProjectList: project[]) => void) {
    // TODO Make the URL variable
    setTimeout(async () => {
      try {
        const response = await axios.get<project[]>("http://localhost:8080/api/project")
        console.log(response.data);
        const newProjects : project[] = response.data;
        handleProjectList(newProjects);
      } catch (error : any) {
        console.log(error)
      }
    
    }, 1000);
}




export default projectContent;