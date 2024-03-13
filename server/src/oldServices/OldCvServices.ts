import { MongoClient } from "mongodb";
import { CV } from "../model/cv";

export class CVServices {
    private cv!: CV | null; //Create default CV here, dunno how so I put 0

    async addCV(cvData: CV) {
        const client = new MongoClient(this.mongoURI);
        try {
            await client.connect(); 
            const db = client.db('britt-marie-wap');
            const collection = db.collection('cv');
            const result = await collection.insertOne(cvData);
            if (result.acknowledged) {
                const insertedId = result.insertedId;

                return { acknowledged: true, insertedId: insertedId };
              } else {
                throw new Error('CV insertion was not acknowledged');
              }
        }
        catch (e) {
            console.error('Error connecting to MongoDB:', e);
        }
        finally {
            await client.close();
        }
    }

    async replaceCV(cvData: CV) {
        const client = new MongoClient(this.mongoURI);
        try {
            await client.connect();
            const db = client.db('britt-marie-wap');
            const collection = db.collection('cv');
    
            await collection.deleteMany({});
    
            const result = await collection.insertOne(cvData);
            if (result.acknowledged) {
                const insertedId = result.insertedId;
                return { acknowledged: true, insertedId: insertedId };
            } else {
                throw new Error('CV replacement was not acknowledged');
            }
        } catch (e) {
            console.error('Error connecting to MongoDB:', e);
        } finally {
            await client.close();
        }
    }

    async getCV(): Promise<CV | null> {
        const client = new MongoClient(this.mongoURI);
        try {
            await client.connect();
            const db = client.db('britt-marie-wap');
            const collection = db.collection('cv');

            const cv = await collection.findOne({});

            // Turn cv into CV object
            // this.cv = cv ? new CV(cv.fileName, cv.contentType, cv.data) : null;

            return JSON.parse(JSON.stringify(this.cv));

        } catch (e) {
            console.error('Error connecting to MongoDB:', e);
        } finally {
            await client.close();
        }
        return null
    }
}
export const cvService: CVServices = new CVServices();