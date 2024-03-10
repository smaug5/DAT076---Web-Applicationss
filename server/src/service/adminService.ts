import { Document, MongoClient, OptionalId } from 'mongodb';
import { User } from '../model/user';

export class adminService {
    mongoURI = 'mongodb+srv://portfoliowap:HackerCatNos@portfolio.zyejove.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio';

    async register(newUser: User): Promise<boolean> {
        const client = new MongoClient(this.mongoURI);
        try {
          await client.connect();
          const db = client.db('britt-marie-wap');
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment for register(). You successfully connected to MongoDB!");

          const collection = db.collection('users');
          // Double check if user already exist 
          const existingUsers = await collection.find({username: newUser.username});
          if ((await existingUsers.toArray()).length !== 0) {
            return false;
          }
          const result = await collection.insertOne(newUser);
          return result.acknowledged.valueOf();
        } catch (error) {

            return false;
        }
    }

    
    async findUser(newUser: User): Promise<boolean> {
        const client = new MongoClient(this.mongoURI);
        try {
          await client.connect();
          const db = client.db('britt-marie-wap');
          // Send a ping to confirm a successful connection
          await client.db("admin").command({ ping: 1 });
          console.log("Pinged your deployment for login(). You successfully connected to MongoDB!");

          const collection = db.collection('users');
          // Double check if user already exist 
          const existingUsers = await collection.find({username: newUser.username, password: newUser.password});
          console.log("FOUND FOLLOWING USER");
          const arr = await existingUsers.toArray();
          if (arr.length === 0) {
            return false;
          }
          return true;
        } catch (error) {
            return false;
        }
    }
    
    async verifyPassword(password: String): Promise<Boolean> { //Return true if verified
        // Replace this with code to verify password

        return (password=="HorseInThisHouse")
    }

    //const hashPassword = await bcrypt.hash(password, 12);
}

export const adminwaplogin = new adminService();

