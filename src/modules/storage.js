import ProjectList from "./projectList.js";
import Project from "./project.js";
import Task from "./task.js";
import Todo from "./todo.js";

const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');
const projectName = document.querySelector('#project-name');

export function getListFromStorage(itemName) {
    return (JSON.parse(localStorage.getItem(itemName)) || []);
}

function setListInStorage(itemName, list) {
    localStorage.setItem(itemName, JSON.stringify(list))
}

export class Storage {
    static getTask() {
        let tasks = new Todo();
        let taskList = getListFromStorage('task');
        tasks.setTasks(taskList);
        return tasks;
    }

    static getProject() {
        let projects = new ProjectList();
        let projectList = getListFromStorage('project');
        projectList.forEach(project => {
            let newProject = new Project(project.name);
            newProject.setTasks(project.tasks);
            projects.addProject(newProject);
        });
        return projects;
    }
}

const tasks = Storage.getTask();
const projects = Storage.getProject();

export function addTaskToStorage() {
    let taskList = getListFromStorage('task');
    if (taskList.some(item => item.name === task.value)) {
        alert('task already exists');
        return;
    }

    let newTask = new Task(taskInput.value, dateInput.value, (new Date()).getMilliseconds());
    
    tasks.addTask(newTask);
    addTaskToProject(newTask.id);

    setListInStorage('task', tasks.getTasks())
}

export function removeTaskFromStorage(taskId, index) {
    let task = tasks.getTask(index);
    let taskProject = task.project;

    if(taskProject !== '') {
       removeTaskFromProject(taskProject, taskId)
    }

    if(index) {
        tasks.deleteTask(index);
    }
    
    setListInStorage('task', tasks.getTasks())
}   

function removeTaskFromProject(taskProject, taskId) {
    let project = projects.findProject(taskProject);
    project.deleteTask(taskId);
    setListInStorage('project', projects.getProjects())
}

export function editTaskInStorage(editData, index) {
    tasks.editTask(editData);
    setListInStorage('task', tasks.getTasks())
}

export function addProjectToStorage() {
    let projectList = getListFromStorage('project');
    if (projectList.some(item => item.name === projectName.value)) {
        alert('project already exists');
        return;
    }

    let newProject = new Project(projectName.value);
    projects.addProject(newProject);
    setListInStorage('project', projects.getProjects())
}

let currentProjectIndex = '';

export function selectCurrentProject(index) {
    currentProjectIndex = index;
}

export function getCurrentProjectIndex() {
    return currentProjectIndex;
}

export function addTaskToProject(newTask) {
    if(currentProjectIndex === '') {
        return;
    }
    
    let task = tasks.findTask(newTask)
    task.project = projects.getProject(currentProjectIndex).name;
    projects.getProject(currentProjectIndex).tasks.push(newTask);

    setListInStorage('project', projects.getProjects())
}

export function deleteTaskFromProject(id, index) {
    let project = projects.getProject(currentProjectIndex);
    disassociateTaskFromInbox(id);

    // project.deleteTask(id);
    if(index) {
        project.deleteTaskByIndex(index);
    }

    setListInStorage('project', projects.getProjects())
}

function disassociateTaskFromInbox(taskId) {
    tasks.findTask(taskId).project = '';
    setListInStorage('task', tasks.getTasks())
}

export function deleteProject(index) {
    let projectTaskList = projects.getProject(index).getTasks();
    if(projectTaskList.length !== 0) {
        projectTaskList.forEach(item => {
            disassociateTaskFromInbox(item);
        })
    }
    
    projects.deleteProjectByIndex(index);
    setListInStorage('project', projects.getProjects())
}

export function toggleTaskStatus(id) {
    let task = tasks.findTask(id);
    task.status === '' ? task.status = 'done' : task.status = ''
    setListInStorage('task', tasks.getTasks())
}