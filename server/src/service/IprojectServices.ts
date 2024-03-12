import { project } from "../model/project";

export interface IprojectService {
    // Returns a deep copy of the current list of projects
    getAllProjects() : Promise<project[]>;

    // Returns a deep copy of the current list of projects
    getProject(name : string) : Promise<project>;

    // Adds a new project to the list
    addProject(project : project): void;

    // Removes a project from the list
    removeProject(title : string): void;
}