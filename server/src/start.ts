import express from "express";
import cors from "cors";
import session from "express-session";
import { cvRouter } from "./router/cvRouter";
import { adminRouter } from "./router/adminRouter";
import { projectRouter } from "./router/projectRouter";
import { v4 as uuid } from 'uuid';
import MongoStore from 'connect-mongo';
import { MongoClient } from 'mongodb';


const mongoURI = "mongodb+srv://portfoliowap:HackerCatNos@portfolio.zyejove.mongodb.net/?retryWrites=true&w=majority&appName=Portfolio"
const client = new MongoClient(mongoURI);

async function start() {
  // since await is annoying es2017
  await client.connect();
}
start();
const db = client.db('britt-marie-wap');
const collection = db.collection('sessions');

const mongoStore = MongoStore.create({
  client: client,
  dbName: 'britt-marie-wap',
  collectionName: 'sessions',
  ttl: 7 * 24 * 60 * 60,
});

export const app = express();

declare module 'express-session' {
  interface Session {
    user?: string;
  }
}

app.use(cors({
  origin: true,
  credentials: true
}));

app.use(express.json());

app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true,
  store: mongoStore,
  genid: (req) => {
    return uuid();
  },
  cookie: {
    httpOnly: true,
    sameSite: 'none', 
    secure: true,
  },
}));

app.options('*', cors());

app.use((req, res, next) => {
  console.log(req.method, req.path);
  console.log('Headers:', req.headers);
  console.log('Session Data:', req.session);
  next();
});

app.use('/api/cv', cvRouter);
app.use('/api/login', adminRouter);
app.use('/api/project', projectRouter);
