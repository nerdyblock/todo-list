import { getCurrentProjectIndex } from "./storage";

export default class ProjectList {
    constructor() {
        this.projects = [];
    }

    addProject(project) {
        this.projects.push(project);
    }

    setProjects(projects) {
        this.projects = projects;
    }

    getProjects() {
        return this.projects;
    }

    getProject(index) {
        // requiredProject = this.projects.find(project => {
        //     project.name === projectName;
        // });
        // return requiredProject;

        return this.projects[index];
    }

    findProject(projectName) {
        let requiredProject = this.projects.find(project =>
            project.name === projectName );
        return requiredProject;
    }

    getProjectIndex(projectName) {
        let taskIndex = this.projects.findIndex(project =>
            project.name === projectName);
        return taskIndex;
    }


    // should not be here should be in Project class
    // deleteTask(index) {
    //     this.projects[getCurrentProjectIndex()].
    // }
   
}