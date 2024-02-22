import { title } from "process";
import { project } from "../model/project";

export class projectService {
   
   // private project : id;
   private projects: project[] = [] // Add so this is equal to all projects in the database.


    async getAllProjects(): Promise<project[]> {
        return JSON.parse(JSON.stringify(this.projects));
    };
    
    async getProject(projectName: String): Promise<project | undefined> {

        this.projects.forEach(project => {
            if (project.title == projectName) {
                return project;
            }
        });
        return undefined;
    }
        

    async addProject(id: Number, title: String, description: String, urlAddress ?: String) {
        const project: project = {
            id: id,
            title: title,
            description: description,
           // imageID: imageID,  // add when we can handle files
            url: urlAddress
          };
          
        this.projects.push(project);
        // include code to add it to the database

    }

    async removeProject(title: String) {

        this.projects = this.projects.filter((element) => element.title !== title);
        //Use DB to remove specific project
      
        //Use title to find project in DB, Remove it.
    }

}


export const projectServices: projectService = new projectService();