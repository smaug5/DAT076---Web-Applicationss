import { project } from "../model/project";

export class projectService {
   
   // private project : id;
   private projects: project[] | undefined // Add so this is equal to all projects in the database.


    async getAllProjects(): Promise<project[] | undefined> {
        return this.projects;
    }
    
    async getProject(projectName: String): Promise<project | undefined> {

        // Get specific project based on name. Return this instead

        return this.projects[0];
            
    }

}





export const projectServices: projectService = new projectService();