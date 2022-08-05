import './styles/style.css';
import {addTaskToStorage, removeTaskFromStorage, editTaskInStorage} from './modules/storage';
import { uiShowTask, uiShowEditForm} from './modules/ui';

const add = document.getElementById('add');

add.addEventListener('click', onTaskSubmit);
// add.addEventListener('click', addTaskToStorage);
// add.addEventListener('click', uiShowTask);
document.addEventListener('click', function(e) {
    if(e.target.id === "save-changes"){
        let taskParent = document.querySelector('.edit-form');
        let editTask = taskParent.querySelector('#task');
        let editDate = taskParent.querySelector('#date');
        let id = editTask.dataset.id
        if(editTask.value !== '' && editDate.value !== '') {
            editTaskInStorage(id , editTask.value, editDate.value);
            closeForm();
        }
    }
})
document.addEventListener('DOMContentLoaded', uiShowTask);

function onTaskSubmit() {
    let taskTitle = document.getElementById('task');
    let taskDate = document.getElementById('date');

    if(taskTitle.value !== '' && taskDate.value !== '') {
        closeForm();
        addTaskToStorage();
        uiShowTask();
    }
    
}

// console.log(JSON.parse(localStorage.getItem('task')));
// localStorage.clear('task');

document.getElementById('todo').addEventListener('mousemove', selectEditandDeleteTask);

function selectEditandDeleteTask() {
    todo.querySelectorAll('[data-delete]').forEach(item => {
        item.addEventListener('click', removeTask);
    });
    todo.querySelectorAll('#edit').forEach(item => {
        item.addEventListener('click', uiShowEditForm)
        item.addEventListener('click', function() {
            // const saveChanges = document.getElementById('save-changes');
            // saveChanges.addEventListener('click', function() {
            //     let taskParent = document.querySelector('.edit-form');
            //     let editTask = taskParent.querySelector('#task');
            //     let editDate = taskParent.querySelector('#date');
            //     let id = editTask.dataset.id
            //     if(editTask.value !== '' && editDate.value !== '') {
            //         editTaskInStorage(id, editTask.value, editDate.value);
            //         closeForm();
            //     }
            // });

            overlay.classList.add('active');
            document.querySelector('.edit-task-form').classList.add('active');
        });
    });
}

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


function openForm() {
    overlay.classList.add('active');
    addTaskForm.classList.add('active');
}

function closeForm() {
    overlay.classList.remove('active');
    addTaskForm.classList.remove('active');

    // change this 
    document.querySelector('.edit-task-form').classList.remove('active'); 
}
