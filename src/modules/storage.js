import ProjectList from "./projectList.js";
import Project from "./project.js";
import Task from "./task.js";
import Todo from "./todo.js";

const taskInput = document.getElementById('task');
const dateInput = document.getElementById('date');

export function getListFromStorage(itemName) {
    return (JSON.parse(localStorage.getItem(itemName)) || []);
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
    
    tasks.addTask(newTask);
    // addTaskToProject(newTask);
    addTaskToProject(newTask.id);

    
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));

    

    // Storage.addTask(newTask);
    // localStorage.setItem('task', JSON.stringify(Storage.getTask().getTasks()));

    // let tasks = Storage.getTask();
    // console.log(tasks.getTasks());

    // let taskList = JSON.parse(localStorage.getItem('task')) || [];
    // taskList.push(todoData());
    // localStorage.setItem('task', JSON.stringify(taskList));
}

export function removeTaskFromStorage(taskId, index) {
    // let tasks =  Storage.getTask();
    let task = tasks.getTask(index);
    let taskProject = task.project;

    // let taskProject = tasks.getTasks()[index].project
    // let taskId = tasks.getTasks()[index].id

    // if(taskProject !== '') {
    //     removeTaskFromProject(taskProject, taskId)
    //     getProjectTask(taskProject)
    // }
 

    if(taskProject !== '') {
       removeTaskFromProject(taskProject, taskId)
    }

    if(index) {
        tasks.deleteTask(index);
    }
    // else {
    //     tasks.deleteTaskById(taskId);
    // }
    
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
    

    // let taskList = JSON.parse(localStorage.getItem('task'))
    // taskList.splice(index, 1);
    // localStorage.setItem('task', JSON.stringify(taskList));
}   

function removeTaskFromProject(taskProject, taskId) {
    let project = projects.findProject(taskProject);
    //    let task;
    //    project.tasks.forEach((item,index) => {
    //        if(item.id === taskId) {
    //            task = index;
    //        }
    //    })    


    project.deleteTask(taskId);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()))
}

export function editTaskInStorage(editData, index) {
    // if(currentProjectIndex === "") {
    //     if(tasks.getTask(index).project === '') {
    //         editTaskInInbox(index, editData);
    //     }
    //     else {
    //         let taskId = tasks.getTask(index).id
    //         let project = tasks.getTask(index).project

    //         selectedProject = projects.getProjectIndex(project);
    //         selectedProject.findTaskIndex(taskId)
    //     }
        
    // }
    
    editTaskInInbox(editData)
    
    // let projectName
    // let containsProject = tasks.getTask(index).project
    // if(containsProject != '') {
    //     projectName = containsProject
    //     getProjectTask(projectName)
    // }
    if(currentProjectIndex !== '') {
        editTaskInInbox(editData)
        // projectName = projects.getProject(currentProjectIndex).name;
        // getProjectTask(projectName)
    }




    // if(currentProjectIndex !== '') {
    //     projectName = projects.getProject(currentProjectIndex).name;
    //     projectTasks = tasks.getProjectTasks(projectName);
    //     projects.getProject(currentProjectIndex).setTasks(projectTasks);
    //     localStorage.setItem('project', JSON.stringify(projects.getProjects()))
    // }


    // if(currentProjectIndex !== '') {
    //     let project = projects.getProjects()[currentProjectIndex];
    //     editTaskInProject(project, editData)
    // }


    // let containsProject = tasks.getTask(index).project
    // if(containsProject !== '') {
    //     let project = projects.findProject(containsProject);
    //     editTaskInProject(project, editData)
    // }

    
    // let taskList = JSON.parse(localStorage.getItem('task'));
    // taskList.forEach(item => {
    //     if(item.taskId === id) {
    //         item.title = editTask;
    //         item.dueDate = editDate;
    //     }
    // });
   
}

function getProjectTask(projectName) {
    let projectTasks = tasks.getProjectTasks(projectName);
    projects.findProject(projectName).setTasks(projectTasks);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()))
}

function editTaskInInbox(editData) {
    tasks.editTask(editData);
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
}

function editTaskInProject(project, editData) {
    project.editTask(editData);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
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
    
    let task = tasks.findTask(newTask)
    task.project = projects.getProject(currentProjectIndex).name;
    // newTask.setProject(projects.getProject(currentProjectIndex).name)
    projects.getProject(currentProjectIndex).tasks.push(newTask);
    // console.log(projects.getProjects())
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
    // let project = projects.getProject(currentProject);
    // project.tasks();
}

export function deleteTaskFromProject(id, index) {
    let project = projects.getProject(currentProjectIndex);
    disassociateTaskFromInbox(id);

    // project.deleteTask(id);
    if(index) {
        project.deleteTaskByIndex(index);
    }
    // projects.getProject(currentProjectIndex).deleteTask(index);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
}

function disassociateTaskFromInbox(taskId) {
    // let task = project.findTask(taskid).id;
    // taskId = task.id;
    // let taskId = project.findTask(taskId).id
    tasks.findTask(taskId).project = '';
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
}

export function deleteProject(index) {
    let projectTaskList = projects.getProject(index).getTasks();
    if(projectTaskList.length !== 0) {
        projectTaskList.forEach(item => {
            disassociateTaskFromInbox(item);
        })
    }
    
    projects.deleteProjectByIndex(index);
    localStorage.setItem('project', JSON.stringify(projects.getProjects()));
}