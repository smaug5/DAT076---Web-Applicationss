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

    async addProject(id: Number, title: String, description: String, urlAddress: String) {
        
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
        this.projects.forEach(element => {
            if (element.title == title) {
              //Use DB to remove specific project
            }
        });

        for (let i = 0; this.projects.length; i++) {
            delete this.projects[i]
            console.log ("Block statement execution no." + i);
        }
      
        //Use title to find project in DB, Remove it.
    }

}


export const projectServices: projectService = new projectService();