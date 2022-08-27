import { Storage, getCurrentProjectIndex, getListFromStorage } from "./storage";
import Todo from "./todo";

const todo = document.getElementById('todo');


function generateTaskUi() 
{
    todo.innerHTML += `
        <div class="task">
            <div class="right">
                <div class="status" data-status></div>
                <p class="title" data-key="" data-id="" data-title></p>
            </div>
            <div class="left">
                <button id="edit">edit</button>
                <p class="date" data-date></p>
                <button class="task-delete" data-delete>&#10060;</button>
            </div>
        </div>
    `

}

function selectDomElements() {
    generateTaskUi();
    let title = document.querySelector('#todo > .task:last-child [data-title]');
    let duedate = document.querySelector('#todo > .task:last-child [data-date]');

    return {
        title, 
        duedate,
    };
}

function getCurrentTaskList() {
    let taskList;
    let currentProjectIndex = getCurrentProjectIndex();
    if(currentProjectIndex === '') {
        taskList = getListFromStorage('task');
    }
    else if(currentProjectIndex === 'today') {
        const tasks = Storage.getTask();
        taskList = tasks.getTodayTask();
    }
    else if(currentProjectIndex === 'upcoming') {
        const tasks = Storage.getTask();
        taskList = tasks.getUpcomingTask();
    }
    else {
        taskList = getProjectTasks();
        // taskList = getListFromStorage('project')[currentProjectIndex].tasks;
    }

    return taskList;
}

function getProjectTasks() {
    let tasks = getListFromStorage('task');
    let taskIds = getListFromStorage('project')[getCurrentProjectIndex()].tasks;
    return taskIds.map(item => tasks.find(task => task.id === item));
}

export function uiShowTask() {
    let taskList = getCurrentTaskList();
    todo.innerHTML = '';
    taskList.forEach((element, index) => {
        let dom = selectDomElements();
        dom.title.textContent = element.name;
        dom.duedate.textContent = element.dueDate;
        dom.title.dataset.key = index;
        dom.title.dataset.id = element.id;
    });
}

export function uiShowEditForm() {
    const editForm = document.querySelector('.edit-task-form');
    let task = this.closest('.task');
    let title = task.querySelector('[data-title]').textContent;
    let date = task.querySelector('[data-date').textContent;
    let id = task.querySelector('[data-title]').dataset.id;

    let index = task.querySelector('[data-title]').dataset.key;

    let editUi = `
        <form class="edit-form">
            <input id="task" data-key="${index}" data-id="${id}" type="text" placeholder="Task" value="${title}" required>
            <input type="date" name="date" id="date" value="${date}" required>
            <textarea name="description" id="description" cols="20" rows="10" placeholder="description"></textarea>
            <button type="button" id="save-changes">Save Changes</button>
        </form>
    `
    editForm.innerHTML = editUi;
}

let projectContainer = document.querySelector('.project-list-container');

function uiGenerateProject() {
    projectContainer.innerHTML += `
        <div class="project-item" data-key="" data-project>
            <h2 class="project-name" data-key=""></h2>
            <button class="project-delete" id="project-delete" data-project-delete>&#10060;</button>
        </div>
    `
} 

export function uiShowProject() {
    let projectList = getListFromStorage('project');
    projectContainer.innerHTML = "";
    projectList.forEach((item, index) => {
        uiGenerateProject();
        let projectName = document.querySelector('.project-list-container > .project-item:last-child .project-name');
        projectName.textContent = item.name;
        projectName.dataset.key = index;

        projectName.parentElement.setAttribute('id', item.name);
        projectName.parentElement.dataset.key = index;
    });
}

// export function uiShowProjectTasks(index) {
//     let taskList = getListFromStorage('project')[index].tasks
//     todo.innerHTML = '';
//     taskList.forEach(element => {
//         let dom = selectDomElements();
//         dom.title.textContent = element.name;
//         dom.duedate.textContent = element.dueDate;
//         dom.title.dataset.key = index;
//     })
// }