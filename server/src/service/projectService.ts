import { title } from "process";
import { project } from "../model/project";
import { Document, MongoClient, OptionalId } from 'mongodb';

export class projectService {
   
    // private project : id;
    private projects: project[] = [] // Add so this is equal to all projects in the database.
    mongoURI = 'mongodb+srv://portfoliowap:HackerCatNos@portfolio.zyejove.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio';


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

        console.log("Projects from the database:")
        console.log(results);        
        console.log("Number of projects from the database:")
        console.log(results.length);

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
    
    async getProject(projectName: String): Promise<project | undefined> {
        let foundProjects = this.projects.filter(x => x.title === projectName);
        if (foundProjects.length === 1) {
            return foundProjects[0];
        }
        return undefined;
    }
        

    async addProject(project: project) {
        const client = new MongoClient(this.mongoURI);
        try {
          await client.connect();
          const db = client.db('britt-marie-wap');
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment for addProject(). You successfully connected to MongoDB!");

          const collection = db.collection('projects'); 
          
          const result = await collection.insertOne(project);
          this.projects.push(project);

          return result.insertedId;
        } catch (error) {
          console.error('Error adding project to the database:', error);
          throw error;  
        } finally {
          await client.close();
        }
      }

    async removeProject(title: String) {

        this.projects = this.projects.filter((element) => element.title !== title);
        //Use DB to remove specific project
      
        //Use title to find project in DB, Remove it.
    }

}


export const projectServices: projectService = new projectService();