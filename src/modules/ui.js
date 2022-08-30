import { Storage, getCurrentProjectIndex, getListFromStorage } from "./storage";

const todo = document.getElementById('todo');
const projectContainer = document.querySelector('.project-list-container');


function generateTaskUi(element, index) {
    todo.innerHTML += `
        <div class="task" data-id="${element.id}">
            <div class="right">
                <input type="checkbox" name="task-status" id="task-status">
                <p class="title" data-key="${index}" data-id="${element.id}" data-title>${element.name}</p>
            </div>
            <div class="left">
                <button id="edit">edit</button>
                <p class="date" data-date>${element.dueDate}</p>
                <button class="task-delete" data-delete>&#10060;</button>
            </div>
        </div>
    `
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
        generateTaskUi(element, index);
        uiSetTaskStatus(element);
    });
    checkTask();
}


function uiSetTaskStatus(task) {
    let taskDiv = document.querySelector('#todo > .task:last-child');
    if(task.status === 'done'){
        taskDiv.classList.add('done');
        return;
    }

    taskDiv.classList.remove('done')
}

function checkTask() {
    document.querySelectorAll('.task').forEach(item => {
        let task = item.querySelector('#task-status');

        item.classList.contains('done') ? task.checked = true : 
            task.checked = false;
    })
}

export function uiShowEditForm() {
    const editForm = document.querySelector('.edit-task-form');
    let task = this.closest('.task');
    let title = task.querySelector('[data-title]').textContent;
    let date = task.querySelector('[data-date').textContent;
    let id = task.querySelector('[data-title]').dataset.id;
    let index = task.querySelector('[data-title]').dataset.key;

    editForm.innerHTML = editUi({title, date, id, index});
}

function editUi(editData) {
    return `
        <form class="edit-form">
            <input id="task" data-key="${editData.index}" data-id="${editData.id}" type="text" placeholder="Task" value="${editData.title}" required>
            <input type="date" name="date" id="date" value="${editData.date}" required>
            <textarea name="description" id="description" cols="20" rows="10" placeholder="description"></textarea>
            <button type="button" id="save-changes">Save Changes</button>
        </form>
    `
}

export function uiShowProject() {
    let projectList = getListFromStorage('project');
    projectContainer.innerHTML = "";
    projectList.forEach((item, index) => {
        uiGenerateProject(item, index);
    });
}

function uiGenerateProject(item, index) {
    projectContainer.innerHTML += `
        <div class="project-item" id="${item.name}" data-key="${index}" data-project>
            <h2 class="project-name" data-key="${index}">${item.name}</h2>
            <button class="project-delete" id="project-delete" data-project-delete>&#10060;</button>
        </div>
    `
} 
