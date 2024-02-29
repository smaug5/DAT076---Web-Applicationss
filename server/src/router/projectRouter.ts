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

projectRouter.get("/:title", async (
    req: Request<{title : string}>,
    res: Response<project | undefined>
) => {
    try {
        const title : String = req.params.title;
        const project = await projectServices.getProject(title);
        console.log(project);
        res.status(200).send(project);
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

projectRouter.put("/", async (
    req: Request<{},string,{title : string, description : string, imageID ?: string, url ?: string}>,
    res: Response<string>
) => {
    try {
        console.log(req.body);
        const title : string = req.body.title;
        console.log(`Title: ${title}`)
        const description : string = req.body.description;
        console.log(`Description: ${description}`)
        await projectServices.addProject(title, description);
        res.status(200).send("Project added succesfully");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});

projectRouter.delete("/:title", async (
    req: Request<{title : string}>,
    res: Response<string>
) => {
    try {
        const title : String = req.params.title;
        await projectServices.removeProject(title);
        res.status(200).send("Project deleted successfully");
    } catch (e: any) {
        res.status(500).send(e.message);
    }
});