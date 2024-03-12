import { createConnection } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const mongoUri = process.env.MONGO_URI; //Checks if mongoURI is defined in the .env file

if (typeof mongoUri !== 'string' || mongoUri.trim() === '') {
    throw new Error('MONGO_URI is not defined in the .env file.'); //If you get this error, check if the .env file is in the server folder and contains the MONGO_URI variable
}

export const conn = createConnection(mongoUri);
