import { projectService } from "../src/service/projectService"
import { project } from "../src/model/project";
import { beforeEach } from "node:test";


//jest.setTimeout(50000);


test("If a project is added, it should be in the list of projects", 
    async () => { 

        const title = "TestProject";
        const desc = "This is a testProject";
        const url = "http:/google.se"

        const newProject: project = {
            title: title,
            description: desc,
            url: url,
            image: null
        }

        const projectServices = new projectService();
        await projectServices.addProject(newProject);
        const testProject = await projectServices.getAllProjects();

        expect(testProject.some((testProject) => testProject.title === title)).toBeTruthy();
},50000);

test("If a project is removed, it should not be in the list of projects", 
    async () => {
        
        const title = "removedProj";
        const desc = "This test is supposed to be removed";
        const url = "http:/google.se"

        const newProject: project = {
            title: title,
            description: desc,
            url: url,
            image: null
        }
        
        const projectServices = new projectService();
        await projectServices.addProject(newProject);
        await projectServices.removeProject(title);
        const testProject = await projectServices.getAllProjects();
        expect(testProject.every((testProject) => testProject.title !== title)).toBeTruthy();
}, 50000);