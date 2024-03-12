import express, { Request, Response } from "express";
import { project } from "../model/project";
import { projectServices, projectService } from "../service/projectService";
import multer from "multer";


export const projectRouter = express.Router();

// Multer storage configuration for handling file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// GET Endpoint to retrieve the list of all projects
projectRouter.get("/", async (
    req: Request,
    res: Response<project[]>
) => {
    try {
        // Retrieve the projectlist from the service
        const allprojects = await projectServices.getAllProjects();

        // Decoding the image data for each project
        allprojects.forEach((project) => { //Decode image data from Base64 to image file
            if (project.image) {
                project.image = `data:image/png;base64,${project.image}`;
            }
        })

        // Send the array of projects as response
        res.status(200).send(allprojects);
    } catch (e: any) {
        // If anything went wrong, send back the error message
        res.status(500).send(e.message);
    }
});

// GET Endpoint to retrieve a specific project
projectRouter.get("/:title", async (
    req: Request<{title : string}>,
    res: Response<project | undefined>
) => {
    try {
        // Extract title from the request body
        const title : string = req.params.title;

        // Retrieve the project from the service, using the title of the project
        const project = await projectServices.getProject(title);
        console.log(project);
        // Send the project as a response
        res.status(200).send(project);
    } catch (e: any) {
        // Handle errors and send the error message as response
        res.status(500).send(e.message);
    }
});

// PUT Endpoint for adding a project to the service, possibly including an image in the request body
projectRouter.put('/', upload.single('image'), async (req, res) => {
try {
    // Extracting title, url and description for the project from the request body
    const { title, url, description } = req.body;
    let imageData = null;

    // Handle the file upload if an image was provided
    if (req.file) {
        imageData = req.file.buffer.toString('base64');
    }
 
    // Creating project object, using information from the request body
    const newProject: project = {
        title: title,
        description: description,
        image: imageData,
        url: url
    }

    // Add the project to the service
    await projectServices.addProject(newProject);
    
    res.status(201).json({ message: 'Project added successfully'});
} catch (error) {
    console.error('Error submitting form:', error);
    res.status(500).json({ message: 'Failed to add project' });
}
});


projectRouter.delete('/', async (
    req: Request,
    res: Response
) => {
    try {

        const { title } = req.body;

        console.log("Title is: " + title);

        const result = await projectServices.removeProject(title);
        console.log(result)
        if (result.success)
            res.status(200);
        else
            res.status(404).json({ message: 'Project not found' });
    } catch (error) {
        console.error('Error removing project', error);
        res.status(500).json({ message: 'Failed to remove project' });
    }
});