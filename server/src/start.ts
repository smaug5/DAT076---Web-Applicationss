import express from "express";
import cors from "cors";

import { defaultRoute } from "./router/defaultRoute";
import { cvRouter } from "./router/cvRouter";
import { adminRouter } from "./router/adminRouter";
import { projectRouter } from "./router/projectRouter";

export const app = express();
/*
app.options('*', cors()); // Pre-flight request


app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
    console.log(`CORS being applied to ${req.method} ${req.path}`);
    next();
});

app.use('/api/cv', cvRouter);
app.use('/api/login', adminRouter);
app.use('/api/project', projectRouter);*/


app.options('*', cors()); 

app.use(cors());
app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.path);
    console.log('Headers:', req.headers);
    next();
  });

  
app.use('/api/cv', cvRouter);
app.use('/api/login', adminRouter);
app.use('/api/project', projectRouter);
