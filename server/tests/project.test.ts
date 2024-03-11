import { project } from "../src/model/project";
import { projectService } from "../src/service/projectService"


test("If a project is added, it should be in the list of projects", 
    async () => { 
        const id = 123;
        const title = "TestProject";
        const desc = "This is a testProject";
        const url = "http://chalmers.it"
        
        const newProject: project = {
            title: title,
            description: desc,
            url: url,
            image: null 
        };

        const projectServices = new projectService();
        await projectServices.addProject(newProject);
        const testProject = await projectServices.getAllProjects();

        expect(testProject.some((testProject) => testProject.title === title)).toBeTruthy();
});

test("If a project is removed, it should not be in the list of projects", 
    async () => {
        const id = 342;
        const title = "removedProj";
        const desc = "This test is supposed to be removed";
        const url = "http://chalmers.se"

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
});