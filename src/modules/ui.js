import { Storage, getCurrentProjectIndex, getListFromStorage, deleteTaskFromProject, addTaskToStorage, editTaskInStorage, selectCurrentProject, toggleTaskStatus, addProjectToStorage, deleteProject, removeTaskFromStorage} from "./storage";
import editIcon from '../assets/edit.svg';
import deleteIcon from '../assets/delete.svg';

export class Ui {
    static loadInbox() {
        uiShowTask();
        uiShowProject();
        Ui.showProjects();
        Ui.initInboxButtons();
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
            item.addEventListener('click', uiShowEditForm)
            item.addEventListener('click', function() {
                Ui.initFormButtons().openEditForm();
            });
        });
        Ui.showEditTask()
    }
    
    static removeTask(e) {
        let idToBeDeleted = e.target.closest('.task').dataset.id;
        let index = e.target.closest('.task').dataset.key;
        let currentProjectIndex = getCurrentProjectIndex()

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
        const addTaskButton = document.querySelector('.add-task');
        const overlay = document.querySelector('.overlay');
        const addTaskForm = document.querySelector('.form-container');
        const editTaskForm = document.querySelector('.edit-task-form');
    
        addTaskButton.addEventListener('click', openAddTaskForm);
        overlay.addEventListener('click', closeForm);

        function openAddTaskForm() {
            overlay.classList.add('active');
            addTaskForm.classList.add('active');
        }

        function openEditForm() {
            overlay.classList.add('active');
            editTaskForm.classList.add('active');
        }
    
        function closeForm() {
            overlay.classList.remove('active');
            addTaskForm.classList.remove('active');
        
            // change this 
            editTaskForm.classList.remove('active'); 
        }

        return {
            openEditForm,
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
        const projectListContainer = document.querySelector('.project-list-container');
        const inboxButton = document.querySelector('#inbox')
        const todayButton = document.querySelector('#today')
        const upcomingButton = document.querySelector('#upcoming')

        inboxButton.addEventListener('click', showProjectTasks)
        todayButton.addEventListener('click', showProjectTasks)
        upcomingButton.addEventListener('click', showProjectTasks)

        projectListContainer.querySelectorAll('.project-item').forEach(project => {
            project.addEventListener('click', function() {
                let projectId = project.id;
                let projectIndex = project.dataset.key;

                showProjectTitle(projectId)
                selectCurrentProject(projectIndex);
                uiShowTask();
            })
        })
        // document.querySelector('.project-list-container').addEventListener('click',function(e) {
        //     let currentProjectIndex = e.target.dataset.key
        //     selectCurrentProject(currentProjectIndex)
        //     uiShowTask()
        // })
        // document.querySelector('.nav').addEventListener('click', function(e) {
        //     let currentProject = e.target.id;

        //     if(currentProject !== 'inbox' && 
        //         currentProject !== 'today' && 
        //         currentProject !== 'upcoming') {
        //             currentProject = e.target.dataset.key;
        //     }
            
        //     if(!currentProject) {
        //         return
        //     }

        //     selectCurrentProject(currentProject);
        //     uiShowTask();
        // });
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
        const showProjectFormButton = document.querySelector('.add-project');
        const addProjectInput = document.querySelector('.add-project-input');
        const cancelProject = document.querySelector('.cancel-project');

        showProjectFormButton.addEventListener('click', openProjectForm);
        cancelProject.addEventListener('click', closeProjectForm);

        function openProjectForm() {    
            addProjectInput.classList.add('active');
        }
        
        function closeProjectForm() {
            addProjectInput.classList.remove('active');
        }

        Ui.projectDelete();

        return {
            openProjectForm,
            closeProjectForm
        }
    }

    static showProjects() {
        const addProjectButton = document.querySelector('.add-project-button');

        addProjectButton.addEventListener('click', function() {
            addProjectToStorage();
            Ui.initAddProjectButton().closeProjectForm();
            uiShowProject();
        });
    }

    static projectDelete() {
        const projectListContainer = document.querySelector('.project-list-container');
        projectListContainer.addEventListener('click', function(e) {
            let index = e.target.dataset.key;

            if(e.target.id === "project-delete") {
                let key = e.target.parentElement.dataset.key;
                deleteProject(key);
                uiShowProject();
            
                if(index !== key) {
                    return
                }
            
                index = ''
            }
        
        
            selectCurrentProject(index);
            uiShowTask();
        });
    }
}







const todo = document.getElementById('todo');
const projectContainer = document.querySelector('.project-list-container');
const taskListHeading = document.querySelector('#tasklist-heading');

function showProjectTasks(e) {
    let currentProject = e.target.id;
    showProjectTitle(currentProject);
    selectCurrentProject(currentProject);
    uiShowTask();
}

function showProjectTitle(title) {
    taskListHeading.textContent = title;
}


function generateTaskUi(element, index) {
    todo.innerHTML += `
        <div class="task" data-id="${element.id}" data-key="${index}">
            <div class="right">
                <input type="checkbox" name="task-status" id="task-status">
                <p class="title" data-key="${index}" data-id="${element.id}" data-title>${element.name}</p>
            </div>
            <div class="left">
                <button id="edit">
                    <img src="${editIcon}" alt="">
                </button>
                <p class="date" data-date>${element.dueDate}</p>
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
    if(currentProjectIndex === 'inbox') {
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
            <button class="project-delete" id="project-delete" data-project-delete>
                <img src="${deleteIcon}" alt="">
            </button>
        </div>
    `
} 
