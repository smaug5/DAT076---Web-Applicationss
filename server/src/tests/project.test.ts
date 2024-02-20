import { projectService, projectServices } from "../service/projectService"

test("If a project is added, show it is done", 
    async () => { 
        const projectServices = new projectService(); 
        expect(await projectServices.addProject(1, "TestProject", "This is a test project", " ")).toBeTruthy;        
})


test("If a project is added, it should be in the list of projects", 
    async () => { 
        const projectServices = new projectService();
        const testProject = await projectServices.addProject(2, "TestProject2", "This is another test project", " ");
        expect(await projectServices.getAllProjects()).toContain(testProject);        
})