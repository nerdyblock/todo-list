import './styles/style.css';
import { Ui } from './modules/ui';
import {addTaskToStorage, removeTaskFromStorage, editTaskInStorage, addProjectToStorage, selectCurrentProject, getCurrentProjectIndex, deleteTaskFromProject, deleteProject, toggleTaskStatus} from './modules/storage';
import { uiShowTask, uiShowEditForm, uiShowProject} from './modules/ui';

document.addEventListener('DOMContentLoaded', Ui.loadInbox);

// const add = document.getElementById('add');

// add.addEventListener('click', onTaskSubmit);

// document.addEventListener('click', function(e) {
//     if(e.target.id === 'task-status') {
//         let taskId = Number(e.target.parentElement.parentElement.dataset.id);
//         toggleTaskStatus(taskId);
//         uiShowTask()
//     }
// })

// document.addEventListener('click', function(e) {
//     if(e.target.id === "save-changes"){
//         let taskParent = document.querySelector('.edit-form');
//         let editTask = taskParent.querySelector('#task');
//         let editDate = taskParent.querySelector('#date');   
//         let id = editTask.dataset.id;
//         let index = editTask.dataset.key;

//         if(editTask.value !== '' && editDate.value !== '') {
//             let editData = {
//                 name : editTask.value,
//                 dueDate : editDate.value,
//                 id : Number(id)
//             }
//             editTaskInStorage(editData, index);
//             closeForm();
//             uiShowTask();
//         }
//     }
// })

// document.addEventListener('DOMContentLoaded', uiShowTask);

// function onTaskSubmit() {
//     let taskTitle = document.getElementById('task');
//     let taskDate = document.getElementById('date');

//     if(taskTitle.value !== '' && taskDate.value !== '') {
//         closeForm();
//         addTaskToStorage();
//         uiShowTask();
//     }
    
// }

// console.log(JSON.parse(localStorage.getItem('task')));
// console.log(JSON.parse(localStorage.getItem('project')));
// // localStorage.clear('task');

// document.getElementById('todo').addEventListener('mousemove', selectEditandDeleteTask);


// function selectEditandDeleteTask() {
//     todo.querySelectorAll('[data-delete]').forEach(item => {
//         item.addEventListener('click', removeTask);
//     });
//     todo.querySelectorAll('#edit').forEach(item => {
//         item.addEventListener('click', uiShowEditForm)
//         item.addEventListener('click', function() {
//             overlay.classList.add('active');
//             document.querySelector('.edit-task-form').classList.add('active');
//         });
//     });
// }

// function removeTask(e) {
//     // let taskToBeDeleted = e.target.closest('.task').dataset.id;
//     // let title = taskToBeDeleted.querySelector('.title');
//     let idToBeDeleted = e.target.closest('.task').dataset.id;
//     let index = e.target.closest('.task').dataset.key;
//     let currentProjectIndex = getCurrentProjectIndex()

//     if(Number.isInteger(currentProjectIndex)) {
//         deleteTaskFromProject(idToBeDeleted, index);
//         uiShowTask();
//         return;
//     }

//     removeTaskFromStorage(idToBeDeleted);
//     // JSON.parse(localStorage.getItem('task')).forEach((item, i) => {
//     //     if(item.id === idToBeDeleted) {
//     //         removeTaskFromStorage(i);
//     //     }   
//     // });
//     uiShowTask();
// }


// // project form

// // localStorage.clear('project')

// const showProjectFormButton = document.querySelector('.add-project');
// const addProjectInput = document.querySelector('.add-project-input');
// showProjectFormButton.addEventListener('click', openProjectForm);
// const cancelProject = document.querySelector('.cancel-project');
// cancelProject.addEventListener('click', closeProjectForm);

// const addProjectButton = document.querySelector('.add-project-button');

// addProjectButton.addEventListener('click', addProjectToStorage);
// addProjectButton.addEventListener('click', closeProjectForm);
// addProjectButton.addEventListener('click', uiShowProject);

// document.addEventListener('DOMContentLoaded', uiShowProject);

// function openProjectForm() {    
//     addProjectInput.classList.add('active');
// }

// function closeProjectForm() {
//     addProjectInput.classList.remove('active');
// }


// // pop up form
// const addTaskButton = document.querySelector('.add-task');
// const overlay = document.querySelector('.overlay');
// const addTaskForm = document.querySelector('.form-container');

// addTaskButton.addEventListener('click', openForm);
// overlay.addEventListener('click', closeForm);


// function openForm() {
//     overlay.classList.add('active');
//     addTaskForm.classList.add('active');
// }

// function closeForm() {
//     overlay.classList.remove('active');
//     addTaskForm.classList.remove('active');

//     // change this 
//     document.querySelector('.edit-task-form').classList.remove('active'); 
// }

// // document.querySelector('#inbox').addEventListener('click', function() {
// //     selectCurrentProject('');
// //     uiShowTask();
// // });

// document.querySelector('.nav').addEventListener('click', function(e) {
//     let currentProject = e.target.id
//     if(currentProject === 'projects') {
//         return;
//     }
//     if(currentProject !== 'inbox' && 
//         currentProject !== 'today' && 
//         currentProject !== 'upcoming') {
//             currentProject = e.target.dataset.key
//     }
    
//     selectCurrentProject(currentProject)
//     uiShowTask()
//     // if(e.target.id === 'today') {
//     //     selectCurrentProject('today');
//     //     uiShowTask();
//     // }
//     // if(e.target.id === 'upcoming') {
//     //     selectCurrentProject('upcoming');
//     //     uiShowTask();
//     // }
// })

// const projectListContainer = document.querySelector('.project-list-container');
// projectListContainer.addEventListener('click', function(e) {
//     let index = e.target.dataset.key;

//     if(e.target.id === "project-delete") {
//         let key = e.target.parentElement.dataset.key;
//         deleteProject(key);
//         uiShowProject();

//         if(index !== key) {
//             return
//         }

//         index = ''
//     }

    
//     selectCurrentProject(index);
//     uiShowTask();
// })

