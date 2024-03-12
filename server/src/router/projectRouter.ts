import express, { Request, Response } from "express";
import { project } from "../model/project";
import { projectServices, projectService } from "../service/projectService";
import multer from "multer";


export const projectRouter = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });


projectRouter.get("/", async (
    req: Request,
    res: Response<project[]>
) => {
    try {
        const allprojects = await projectServices.getAllProjects();

        allprojects.forEach((project) => { //Decode image data from Base64 to image file
            if (project.image) {
                project.image = `data:image/png;base64,${project.image}`;
            }
        })
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


projectRouter.put('/', upload.single('image'), async (req, res) => {
try {
    //console.log(req.body);
    const tit : string = req.body.title;
    //console.log(`Title: ${tit}`)
    const desc : string = req.body.description;
    //console.log(`Description: ${desc}`)

    const { title, url, description } = req.body;
    let imageData = null;

    if (req.file) {
        imageData = req.file.buffer.toString('base64');
    }
 
    const newProject: project = {
        title: title,
        description: description,
        image: imageData,
        url: url
    }

    let projectAdded = await projectServices.addProject(newProject);
    
    if (!projectAdded) {
        res.status(400).send('Project with that name already exists');
    }
    else res.status(201).json({ message: 'Project added successfully'});
} catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to add project' });
}
});


projectRouter.delete('/:title', async (
    req: Request<{title: string}>,
    res: Response
) => {
    try {
        const title : String = req.params.title;

        console.log("Title is: " + title);

        const result = await projectServices.removeProject(title);
        console.log(result)
        if (result?.success)
            res.status(200);
        else
            res.status(404).json({ message: 'Project not found' });
    } catch (error) {
        console.error('Error removing project', error);
        res.status(500).json({ message: 'Failed to remove project' });
    }
});