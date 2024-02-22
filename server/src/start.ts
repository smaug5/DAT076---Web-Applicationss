import express from "express";
import { defaultRoute } from "./router/defaultRoute";
import { cvRouter } from "./router/cvRouter";
import { adminRouter } from "./router/adminRouter";
import { projectRouter } from "./router/projectRouter";

export const app = express();

app.use(express.json());
app.use('/api/cv', cvRouter);
app.use('/api/login', adminRouter);
app.use('/api/project', projectRouter);

export const routes = express.Router();
