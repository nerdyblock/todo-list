import './styles/style.css';
import {addTaskToStorage, removeTaskFromStorage, editTaskInStorage, addProjectToStorage, selectCurrentProject, getCurrentProjectIndex, deleteTaskFromProject} from './modules/storage';
import { uiShowTask, uiShowEditForm, uiShowProject} from './modules/ui';

const add = document.getElementById('add');

add.addEventListener('click', onTaskSubmit);

document.addEventListener('click', function(e) {
    if(e.target.id === "save-changes"){
        let taskParent = document.querySelector('.edit-form');
        let editTask = taskParent.querySelector('#task');
        let editDate = taskParent.querySelector('#date');   
        let id = editTask.dataset.id;
        let index = editTask.dataset.key;

        if(editTask.value !== '' && editDate.value !== '') {
            let editData = {
                name : editTask.value,
                dueDate : editDate.value,
                id : Number(id)
            }
            editTaskInStorage(editData, index);
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
            overlay.classList.add('active');
            document.querySelector('.edit-task-form').classList.add('active');
        });
    });
}

function removeTask(e) {
    let taskToBeDeleted = e.target.closest('.task');
    let title = taskToBeDeleted.querySelector('.title');
    // let idToBeDeleted = title.getAttribute('id');

    let index = title.dataset.key;

    if(getCurrentProjectIndex()) {
        deleteTaskFromProject(index);
        uiShowTask();
        return;
    }

    removeTaskFromStorage(index);
    // JSON.parse(localStorage.getItem('task')).forEach((item, i) => {
    //     if(item.id === idToBeDeleted) {
    //         removeTaskFromStorage(i);
    //     }   
    // });
    uiShowTask();
}


// project form

// localStorage.clear('project')

const showProjectFormButton = document.querySelector('.add-project');
const addProjectInput = document.querySelector('.add-project-input');
showProjectFormButton.addEventListener('click', openProjectForm);
const cancelProject = document.querySelector('.cancel-project');
cancelProject.addEventListener('click', closeProjectForm);

const addProjectButton = document.querySelector('.add-project-button');
// addProjectButton.addEventListener('click', uiAddProject)

addProjectButton.addEventListener('click', addProjectToStorage);
addProjectButton.addEventListener('click', closeProjectForm);
console.log(JSON.parse(localStorage.getItem('project')))
addProjectButton.addEventListener('click', uiShowProject);
document.addEventListener('DOMContentLoaded', uiShowProject);

function openProjectForm() {    
    addProjectInput.classList.add('active');
}

function closeProjectForm() {
    addProjectInput.classList.remove('active');
}


// pop up form
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

document.querySelector('#inbox').addEventListener('click', function() {
    selectCurrentProject('');
    uiShowTask();
});

const projectListContainer = document.querySelector('.project-list-container');
projectListContainer.addEventListener('click', function(e) {
    // let selectedProject = e.target.closest('[data-project]').id;
    let index = e.target.dataset.key;
    selectCurrentProject(index);
    uiShowTask();
    // uiShowProjectTasks(index);
})