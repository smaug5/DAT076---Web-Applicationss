import React, { useEffect, useState } from 'react';
import '../App.css';
import '../../src/css/main.css';
import '../../src/css/animations.css';
import { project } from '../../../server/src/model/project';
import axios from 'axios';
import { Button, Card } from 'react-bootstrap';


export function ProjectContent() {
  const [theProjectList, setProjectList] = useState<project[]>([]);

  useEffect(() => {
      updateProjects(handleProjectList);
  }, []);

  const handleProjectList = (newProjectList: project[]) => {
      setProjectList(newProjectList);
      //Show first project in the list
      console.log('First project:' + newProjectList[0].image);
  };

  return (
    <div className="d-flex flex-wrap">
      {theProjectList.map((oneProject: project) => (
        <Card key={String(oneProject.title)} style={{ width: '18rem', margin: '1rem' }}>
          <Card.Img variant="top" src={String(oneProject.image) || ''} alt="Project" />
          <Card.Body>
            <Card.Title>{oneProject.title}</Card.Title>
            <Card.Text>
              {oneProject.description}
            </Card.Text>
            <Button variant="primary" id="CV-button" href={String(oneProject.url)}>See project</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export async function updateProjects(handleProjectList: (newProjectList: project[]) => void) {
    // TODO: Make the URL variable.
    try {
        const response = await axios.get<project[]>("http://localhost:8080/api/project");
        const newProjects : project[] = response.data;
        handleProjectList(newProjects);
    } catch (error : any) {
        console.log(error);
    }
}

export default ProjectContent;