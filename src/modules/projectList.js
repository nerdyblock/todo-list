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
        return this.projects[index];
    }

    findProject(projectName) {
        return this.projects.find(project =>
            project.name === projectName );
    }

    getProjectIndex(projectName) {
        return this.projects.findIndex(project =>
            project.name === projectName);;
    }

    deleteProjectByIndex(index) {
        this.projects.splice(index, 1);
    }
   
}