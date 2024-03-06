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
        console.log("Pinged your deployment. You successfully connected to MongoDB!");

        const collection = db.collection('projects');
        const cursor = collection.find();
        const results = await cursor.toArray();

        console.log("Projects from the database:")
        console.log(results);

        // Turn results into project[] objects


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
          console.log("Pinged your deployment. You successfully connected to MongoDB!");

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