import { title } from "process";
import { project } from "../model/project";
import { Document, MongoClient, OptionalId } from 'mongodb';

export class projectService {
   
    // private project : id;
    private projects: project[] = [] // Add so this is equal to all projects in the database.


    async getAllProjects(): Promise<project[]> {
      const client = new MongoClient(this.mongoURI);
      try {
        await client.connect();
        const db = client.db('britt-marie-wap');

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment for getAllProjects(). You successfully connected to MongoDB!");

        const collection = db.collection('projects');
        const cursor = collection.find();
        const results = await cursor.toArray();

        //console.log("Projects from the database:")
        //console.log(results);        
        //console.log("Number of projects from the database:")
        //console.log(results.length);

        // Turn results into project[] objects
        this.projects = results.map((project: any) => {
          return {
            title: project.title,
            description: project.description,
            image: project.image,
            url: project.url
          }
        });
        
        return JSON.parse(JSON.stringify(this.projects));
      }
      catch (error) {
        console.error('Error getting projects from the database:', error);
        throw error;
      } finally {
        await client.close();
      }

    };
    
    async getProject(projectName: String): Promise<project> {
        const allProjects = this.getAllProjects();
        const specificProject = (await allProjects).filter(x => x.title === projectName);
        if (specificProject.length === 0) {
          throw Error("Project not found.");
        }
        return specificProject[0];
    }
  

    async addProject(project: project): Promise<String | Boolean> {
        const client = new MongoClient(this.mongoURI);
        try {
          await client.connect();
          const db = client.db('britt-marie-wap');
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment for addProject(). You successfully connected to MongoDB!");

          const collection = db.collection('projects'); 
          const allProjects = this.getAllProjects();
          let projectAdded: boolean = true;

          if ((await allProjects).filter(x => x.title === project.title).length >= 1) {
            console.log("There is already a project with this title");
            return false;
          } else {
            const result = await collection.insertOne(project);
            this.projects.push(project);
            console.log("THIS IS THE RESULT:");
            console.log(result);
            return true;
          };
          
        } catch (error) {
          console.error('Error adding project to the database:', error);
          throw error;  
        } finally {
          await client.close();
        }
      }

    async removeProject(title: String) {
      const client = new MongoClient(this.mongoURI);
      try {
        await client.connect();
        const db = client.db('britt-marie-wap');
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment for removeProject(). Your successfully connected to MongoDB!");
        const collection = db.collection('projects');

        const deletedProject = await collection.findOneAndDelete({ "title": title });
        this.projects = this.projects.filter(x => x.title !== title);

        if (!deletedProject) {
          console.log('Project not found');
          return {success: false}
        }
        await client.close();
        alert("Project" + title + " deleted successfully!");
        return {success: true}
 
      } catch (error) {
        console.error('Error removing project from the database:', error);
      }
    }
  }
export const projectServices: projectService = new projectService();