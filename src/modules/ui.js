import { Storage, getCurrentProjectIndex, getListFromStorage, deleteTaskFromProject, addTaskToStorage, editTaskInStorage, selectCurrentProject, toggleTaskStatus, addProjectToStorage, deleteProject, removeTaskFromStorage} from "./storage";
import format from "date-fns/format";
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

const addTaskButton = document.querySelector('.add-task');
const overlay = document.querySelector('.overlay');
const addTaskForm = document.querySelector('.form-container');
const editTaskForm = document.querySelector('.edit-task-form');
const descriptionContainer = document.querySelector('.description-container');

const projectListContainer = document.querySelector('.project-list-container');
const inboxButton = document.querySelector('#Inbox');
const todayButton = document.querySelector('#Today');
const upcomingButton = document.querySelector('#Upcoming');

const showProjectFormButton = document.querySelector('.add-project');
const addProjectInput = document.querySelector('.add-project-input');
const addProjectButton = document.getElementById('add-project-button');
const cancelProject = document.querySelector('.cancel-project');


export class Ui {
    static loadInbox() {
        uiShowTask();
        uiShowProject();
        Ui.initInboxButtons();
        Ui.addProjects();
        Ui.initAddProjectButton();
        Ui.showProjectTasks();
        Ui.showTaskCompleted();
    }

    static initInboxButtons() {
        Ui.initFormButtons()
        Ui.selectEditandDeleteTask()
        const add = document.getElementById('add');
        add.addEventListener('click', Ui.onTaskSubmit);
    }
    
    static selectEditandDeleteTask() {
        todo.querySelectorAll('[data-delete]').forEach(item => {
            item.addEventListener('click', Ui.removeTask);
        });
        todo.querySelectorAll('#edit').forEach(item => {
            item.addEventListener('click', uiShowEditForm);
            item.addEventListener('click', openEditForm);
        });
        todo.querySelectorAll('#details').forEach(item => {
            item.addEventListener('click', uiShowTaskDescription);
            item.addEventListener('click', openDescription);
        });
        Ui.showEditTask()
    }
    
    static removeTask(e) {
        let idToBeDeleted = e.target.closest('.task').dataset.id;
        let index = e.target.closest('.task').dataset.key;
        let currentProjectIndex = Number(getCurrentProjectIndex()) 

        if(Number.isInteger(currentProjectIndex)) {
            deleteTaskFromProject(idToBeDeleted, index);
            uiShowTask();
            return;
        }

        removeTaskFromStorage(idToBeDeleted);
        uiShowTask();
    }
    
    
    static onTaskSubmit() {
        let taskTitle = document.getElementById('task');
        let taskDate = document.getElementById('date');
    
        if(taskTitle.value !== '' && taskDate.value !== '') {
            Ui.initFormButtons().closeForm();
            addTaskToStorage();
            uiShowTask();
        }
    }
    
    static initFormButtons() {
        addTaskButton.addEventListener('click', openAddTaskForm);
        overlay.addEventListener('click', closeForm);

        function openAddTaskForm() {
            overlay.classList.add('active');
            addTaskForm.classList.add('active');
        }
    
        function closeForm() {
            overlay.classList.remove('active');
            addTaskForm.classList.remove('active');
        
            editTaskForm.classList.remove('active'); 
            descriptionContainer.classList.remove('active');
        }

        return {
            openAddTaskForm,
            closeForm
        }
    }

    static showEditTask() {
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
                    Ui.initFormButtons().closeForm();
                    uiShowTask();
                }
            }
        });
    }

    static showProjectTasks() {
        inboxButton.addEventListener('click', showProjectTasks)
        todayButton.addEventListener('click', showProjectTasks)
        upcomingButton.addEventListener('click', showProjectTasks)

        projectListContainer.querySelectorAll('.project-item').forEach(project => {
            project.addEventListener('click', function(e) {
                if(e.target.classList.contains('project-delete')) {
                    return;
                }

                let projectId = project.id;
                let projectIndex = project.dataset.key;

                showProjectTitle(projectId)
                selectCurrentProject(projectIndex);
                uiShowTask();
            })
        })
    }

    static showTaskCompleted() {
        document.addEventListener('click', function(e) {
            if(e.target.id === 'task-status') {
                let taskId = Number(e.target.parentElement.parentElement.dataset.id);
                toggleTaskStatus(taskId);
                uiShowTask();
            }
        });        
    }

    static initAddProjectButton() {
        showProjectFormButton.addEventListener('click', openProjectForm);
        cancelProject.addEventListener('click', closeProjectForm);

        
        function openProjectForm() {    
            addProjectInput.classList.add('active');
        }
        
        function closeProjectForm() {
            addProjectInput.classList.remove('active');
        }

        return {
            openProjectForm,
            closeProjectForm
        }
    }

    static addProjects() {
        addProjectButton.addEventListener('click', function() {
            addProjectToStorage();
            Ui.initAddProjectButton().closeProjectForm();
            uiShowProject();
            // Ui.showProjectTasks();
        });
    }

    static projectDelete() {
        projectListContainer.querySelectorAll('[data-project-delete]')
            .forEach(project => {
                project.addEventListener('click', function(e) {
                    let index = getCurrentProjectIndex();
                    let key =  e.target.closest('[data-project]').dataset.key;
                    deleteProject(key);
                    uiShowProject();
            
                    if(index !== key) {
                        return
                    }
            
                    index = 'inbox'

                    selectCurrentProject(index);
                    uiShowTask();
                });
            });
    }
}


function openDescription() {
    overlay.classList.add('active');
    descriptionContainer.classList.add('active');
}

function openEditForm() {
    overlay.classList.add('active');
    editTaskForm.classList.add('active');
}


const todo = document.getElementById('todo');
const taskListHeading = document.querySelector('#tasklist-heading');

function showProjectTasks(e) {
    let currentProject = e.target.id;
    showProjectTitle(currentProject);
    selectCurrentProject(currentProject);
    uiShowTask();
}

function removeHighlight() {
    document.querySelectorAll('.nav .nav-selected').forEach(item => {
        item.classList.remove('nav-selected');
    })
}

function highlightCurrentProject(title) {
    removeHighlight()
    document.getElementById(title).classList.add('nav-selected');
}

function showProjectTitle(title) {
    highlightCurrentProject(title);
    taskListHeading.textContent = title;
}


function generateTaskUi(element, index) {
    todo.innerHTML += `
        <div class="task" data-id="${element.id}" data-key="${index}">
            <div class="right">
                <input type="checkbox" name="task-status" id="task-status">
                <p class="title" data-key="${index}" data-id="${element.id}" data-title>${element.name}</p>
                <p class="description" data-desc style="display:none;">${element.description}</p>
            </div>
            <div class="left">
                <button id="details">Details</button>
                <button id="edit">
                    <img src="${editIcon}" alt="">
                </button>
                <p class="date" data-date>${format(new Date(element.dueDate), 'dd MMM yyyy')}</p>
                <button class="task-delete" data-delete>
                    <img src="${deleteIcon}" alt="">
                </button>
            </div>
        </div>
    `
}

function getCurrentTaskList() {
    let taskList;
    let currentProjectIndex = getCurrentProjectIndex();
    if(currentProjectIndex === 'Inbox') {
        taskList = getListFromStorage('task');
    }
    else if(currentProjectIndex === 'Today') {
        const tasks = Storage.getTask();
        taskList = tasks.getTodayTask();
    }
    else if(currentProjectIndex === 'Upcoming') {
        const tasks = Storage.getTask();
        taskList = tasks.getUpcomingTask();
    }
    else {
        taskList = getProjectTasks();
    }
    
    return sortTaskList(taskList);
}   

function sortTaskList(taskList) {
    return taskList.sort((a,b) => new Date(a.dueDate) - new Date(b.dueDate))
}

function getProjectTasks() {
    let tasks = getListFromStorage('task');
    let taskIds = getListFromStorage('project')[getCurrentProjectIndex()].tasks;
    return taskIds.map(item => tasks.find(task => task.id === item));
}

export function uiShowTask() {
    uiShowAddTaskButton()
    let taskList = getCurrentTaskList();
    todo.innerHTML = '';
    taskList.forEach((element, index) => {
        generateTaskUi(element, index);
        uiSetTaskStatus(element);
    });
    checkTask();
    Ui.initInboxButtons()
}

function uiShowAddTaskButton() {
    if(getCurrentProjectIndex() === 'today' || getCurrentProjectIndex() === 'upcoming') {
        document.querySelector('.add-task').style.display = 'none'
        return;
    }

    document.querySelector('.add-task').style.display = 'block'
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

function uiShowTaskDescription() {
    let task = this.closest('.task');
    let title = task.querySelector('[data-title]').textContent;
    let date = task.querySelector('[data-date]').textContent;
    let description = task.querySelector('[data-desc]').innerText;

    descriptionContainer.innerHTML = generateDescription({title, date, description})
}

function generateDescription(descData) {
    return `
        <h1>${descData.title}</h1>
        <h3>${format(new Date(descData.date), 'dd MMM yyyy')}</h3>
        <p>${descData.description}</p>
    `
}

export function uiShowEditForm() {
    const editForm = document.querySelector('.edit-task-form');
    let task = this.closest('.task');
    let title = task.querySelector('[data-title]').innerText;
    let desc = task.querySelector('[data-desc]').textContent;
    let date = task.querySelector('[data-date').innerText;
    let id = task.querySelector('[data-title]').dataset.id;
    let index = task.querySelector('[data-title]').dataset.key;

    editForm.innerHTML = editUi({title, date, desc, id, index});
}

function editUi(editData) {
    return `
        <form class="edit-form">
            <input id="task" data-key="${editData.index}" data-id="${editData.id}" type="text" placeholder="Task" value="${editData.title}" required>
            <input type="date" name="date" id="date" value="${format(new Date(editData.date), 'yyyy-MM-dd')}" required>
            <textarea name="description" id="description" cols="20" rows="10" placeholder="description">${editData.desc}</textarea>
            <button type="button" id="save-changes">Save Changes</button>
        </form>
    `
}

function uiShowProject() {
    let projectList = getListFromStorage('project');
    projectListContainer.innerHTML = "";
    projectList.forEach((item, index) => {
        uiGenerateProject(item, index);
    });
    Ui.showProjectTasks();
    Ui.projectDelete();
}

function uiGenerateProject(item, index) {
    projectListContainer.innerHTML += `
        <div class="project-item" id="${item.name}" data-key="${index}" data-project>
            <h2 class="project-name" data-key="${index}">${item.name}</h2>
            <button class="project-delete" id="project-delete" data-project-delete>
                <img class="project-delete" src="${deleteIcon}" alt="">
            </button>
        </div>
    `
} 
