import { project } from "../model/project";

export class projectService {
   
   // private project : id;
   private projects: project[] = [] // Add so this is equal to all projects in the database.


    async getAllProjects(): Promise<project[] | undefined> {
        return this.projects;
    }
    
    async getProject(projectName: String): Promise<project | undefined> {

        // Get specific project based on name. Return this instead

        return this.projects[0];
    }

    async addProject(id: Number, titel: String, description: String, urlAddress: String): Promise<Boolean> {
        
        const project: project = {
            id: id,
            titel: titel,
            description: description,
           // imageID: imageID,  // add when we can handle files
            url: urlAddress
          };
          if(! project) {
            return false;
          }
          
        this.projects.push(project);
        // include code to add it to the database
          return true; // what should be returned?

    }

}


export const projectServices: projectService = new projectService();