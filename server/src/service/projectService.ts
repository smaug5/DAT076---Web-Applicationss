import { title } from "process";
import { project } from "../model/project";
import { Document, MongoClient, OptionalId } from 'mongodb';
import { IprojectService } from "./IprojectServices";
import { projectModel } from "../model/project.db";

export class projectService implements IprojectService{
  
  //retrieves all the projects for the databse
  async getAllProjects(): Promise<project[]> {
    //find all projects in the database
    const projects = projectModel.find()
    //check if project are found
    if (projects) {
      return projects;
    }
    else {
      throw new Error("No projects found.");
    }
  }

  //retrieves a project by its name from database
  async getProject(name: string): Promise<project> {
    //find project in database with spec name
    return projectModel.findOne({ name: name }).then((project) => {
      if (project) {
        return project;
      } else {
        throw new Error("Project not found.");
      }
    });
  }

  //adds a new project to the database
  async addProject(project: project) {
    //create a new proj doc in databse
    projectModel.create(project);
    return;
  }

  //removes a project by its name from database
  async removeProject(title: string) {
    try {
      //tries to delete proj doc with title
        await projectModel.deleteOne({ title: title });
    } catch (e) {
        console.error(e);
        throw new Error("Error while deleting the project.");
    }
    return { success: true };
}

  
}
   
   
export const projectServices: projectService = new projectService();