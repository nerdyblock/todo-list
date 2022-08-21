import ProjectList from "./projectList.js";
import Project from "./project.js";
import Task from "./task.js";
import Todo from "./todo.js";

const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');

export function getListFromStorage(itemName) {
    return JSON.parse(localStorage.getItem(itemName)) || [];
}

class Storage {
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
        // projects.setProjects(projectList);
        return projects;
    }
}

const tasks = Storage.getTask();


// function todoData() {
//     let newTask = new Task(task.value, date.value, Math.random().toString(16).slice(2));

//     return  {
//         title : newTask.getName(),
//         dueDate : newTask.getDateFormatted(),
//         taskId : newTask.getId()
//     };  
// }

export function addTaskToStorage() {
    // const tasks = Storage.getTask();
    let taskList = getListFromStorage('task');
    if (taskList.some(item => item.name === task.value)) {
        alert('task already exists');
        return;
    }

    let newTask = new Task(taskInput.value, dateInput.value, (new Date()).getMilliseconds());
    addTaskToProject(newTask);
    tasks.addTask(newTask);
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));

    

    // Storage.addTask(newTask);
    // localStorage.setItem('task', JSON.stringify(Storage.getTask().getTasks()));

    // let tasks = Storage.getTask();
    // console.log(tasks.getTasks());

    // let taskList = JSON.parse(localStorage.getItem('task')) || [];
    // taskList.push(todoData());
    // localStorage.setItem('task', JSON.stringify(taskList));
}

export function removeTaskFromStorage(index) {
    // let tasks =  Storage.getTask();
    let taskProject = tasks.getTasks()[index].project
    let taskId = tasks.getTasks()[index].id
    if(taskProject !== '') {
       removeTaskFromProject(taskProject, taskId)
    }

    tasks.deleteTask(index);
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
    

    // let taskList = JSON.parse(localStorage.getItem('task'))
    // taskList.splice(index, 1);
    // localStorage.setItem('task', JSON.stringify(taskList));
}   

function removeTaskFromProject(taskProject, taskId) {
    let project = projects.findProject(taskProject);
       let task;
       project.tasks.forEach((item,index) => {
           if(item.id === taskId) {
               task = index;
           }
       }) 
       console.log(task);

       project.deleteTask(task);
       localStorage.setItem('project', JSON.stringify(projects.getProjects()))
}

export function editTaskInStorage(index, editTask, editDate) {
    tasks.editTask(index, editTask, editDate);
    // let taskList = JSON.parse(localStorage.getItem('task'));
    // taskList.forEach(item => {
    //     if(item.taskId === id) {
    //         item.title = editTask;
    //         item.dueDate = editDate;
    //     }
    // });
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
}

let projectName = document.querySelector('#project-name');
const projects = Storage.getProject();

export function addProjectToStorage() {
    let projectList = getListFromStorage('project');
    if (projectList.some(item => item.name === projectName.value)) {
        alert('project already exists');
        return;
    }

    let newProject = new Project(projectName.value);
    projects.addProject(newProject);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
}

let currentProjectIndex = '';

export function selectCurrentProject(index) {
    // if(index === '') {
    //     currentProjectIndex = index;
    //     return;
    // }

    currentProjectIndex = index;
    // console.log(currentProjectIndex);
}

export function getCurrentProjectIndex() {
    return currentProjectIndex;
}

export function addTaskToProject(newTask) {
    if(currentProjectIndex === '') {
        return;
    }
    newTask.setProject(projects.getProject(currentProjectIndex).name)
    projects.getProject(currentProjectIndex).tasks.push(newTask);
    // console.log(projects.getProjects())
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
    // let project = projects.getProject(currentProject);
    // project.tasks();
}

export function deleteTaskFromProject(index) {
    let project = projects.getProject(currentProjectIndex);
    disassociateTaskFromInbox(project, index);

    project.deleteTask(index);
    // projects.getProject(currentProjectIndex).deleteTask(index);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
}

function disassociateTaskFromInbox(project, index) {
    let taskId = project.getTask(index).id
    tasks.findTask(taskId).project = ''
}