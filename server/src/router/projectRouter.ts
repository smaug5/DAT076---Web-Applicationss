import express, { Request, Response } from "express";
import { project } from "../model/project";
import { projectServices, projectService } from "../service/projectService";

export const projectRouter = express.Router();

projectRouter.get("/", async (
    req: Request,
    res: Response<project[]>
) => {
    try {
        const allprojects = await projectServices.getAllProjects(); 
        res.status(200).send(allprojects);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

projectRouter.get("/specificProject", async (
    req: Request,
    res: Response<project | undefined>
) => {
    try {
        const project = await projectServices.getProject("Cool Construction Project"); 
        res.status(200).send(project);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

projectRouter.put("/", async (
    req: Request,
    res: Response<Boolean>
) => {
    try {
        const verifiedStatus = await projectServices.addProject(0, "Cool project", "description", "www.haskdja.se");
        res.status(200).send(verifiedStatus);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});