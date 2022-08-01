import './styles/style.css';
import {addTaskToStorage, removeTaskFromStorage} from './modules/storage';
import { uiShowTask } from './modules/ui';

const add = document.getElementById('add');
add.addEventListener('click', addTaskToStorage);
add.addEventListener('click', uiShowTask);
document.addEventListener('DOMContentLoaded', uiShowTask);

// let data = localStorage.getItem('task');
// console.log(JSON.parse(data));
// localStorage.clear('task');

document.getElementById('todo').addEventListener('click', removeTask);

function removeTask(e) {
    let taskToBeDeleted = e.target.closest('.task');
    let title = taskToBeDeleted.querySelector('.title');
    let idToBeDeleted = title.getAttribute('id');
    JSON.parse(localStorage.getItem('task')).forEach((item, i) => {
        if(item.taskId === idToBeDeleted) {
            removeTaskFromStorage(i);
        }   
    });
    uiShowTask();
}

const addTaskButton = document.querySelector('.add-task');
const overlay = document.querySelector('.overlay');
const addTaskForm = document.querySelector('.form-container');

addTaskButton.addEventListener('click', openForm);
overlay.addEventListener('click', closeForm);
add.addEventListener('click', closeForm);

function openForm() {
    overlay.classList.add('active');
    addTaskForm.classList.add('active');
}

function closeForm() {
    overlay.classList.remove('active');
    addTaskForm.classList.remove('active');
}
