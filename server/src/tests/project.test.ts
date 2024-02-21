import { projectService, projectServices } from "../service/projectService"


test("If a project is added, it should be in the list of projects", 
    async () => { 
        const id = 123;
        const title = "TestProject";
        const desc = "This is a testProject";

        const projectServices = new projectService();
        await projectServices.addProject(id, title, desc);
        const testProject = await projectServices.getAllProjects();

        expect(testProject.some((testProject) => testProject.title === title)).toBeTruthy;        
});


test("If a project is removed, it should not be in the list of projects", 
    async () => {
        const id = 342;
        const title = "removedProj";
        const desc = "This test is supposed to be removed";

        const projectServices = new projectService();
        await projectServices.addProject(id, title, desc);
        await projectServices.removeProject(title);
        const testProject = await projectServices.getAllProjects();

        expect(testProject.some((testProject) => testProject.title === title)).toBeFalsy;
    });