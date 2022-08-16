import { getListFromStorage } from "./storage";

const todo = document.getElementById('todo');


function generateTaskUi() 
{
    todo.innerHTML += `
        <div class="task">
            <div class="right">
                <div class="status" data-status></div>
                <p class="title" data-title></p>
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

export function uiShowTask() {
    let taskList = getListFromStorage('task');
    todo.innerHTML = '';
    taskList.forEach(element => {
        let dom = selectDomElements();
        dom.title.textContent = element.name;
        dom.duedate.textContent = element.dueDate;
        dom.title.setAttribute('id', element.id);
    });
}

export function uiShowEditForm() {
    const editForm = document.querySelector('.edit-task-form');
    let task = this.closest('.task');
    let title = task.querySelector('[data-title]').textContent;
    let date = task.querySelector('[data-date').textContent;
    let id = task.querySelector('[data-title]').getAttribute('id');
    let editUi = `
        <form class="edit-form">
            <input id="task" data-id="${id}" type="text" placeholder="Task" value="${title}" required>
            <input type="date" name="date" id="date" value="${date}" required>
            <textarea name="description" id="description" cols="20" rows="10" placeholder="description"></textarea>
            <button id="save-changes">Save Changes</button>
        </form>
    `
    editForm.innerHTML = editUi;
}

let projectContainer = document.querySelector('.project-list-container');

function uiGenerateProject() {
    projectContainer.innerHTML += `
        <div class="project-item">
            <h2 class="project-name"></h2>
        </div>
    `
} 

export function uiShowProject() {
    let projectList = getListFromStorage('project');
    projectContainer.innerHTML = "";
    projectList.forEach(item => {
        uiGenerateProject();
        let projectName = document.querySelector('.project-list-container > .project-item:last-child .project-name');
        
        projectName.textContent = item.name;
    })
}