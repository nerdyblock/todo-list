import Task from "./task.js";
import Todo from "./todo.js";

const task = document.getElementById('task');
const date = document.getElementById('date');

class Storage {
    static getTask() {
        let tasks = new Todo();
        let taskList = JSON.parse(localStorage.getItem('task'));
        tasks.setTasks(taskList);
        return tasks;
    }

    // static addTask() {
    //     let tasks = getTask();
    //     let task = new Task(task.value, date.value, Math.random().toString(16).slice(2));
    //     tasks.addTask(task);
    // }

}

const tasks = Storage.getTask();

function todoData() {
    let newTask = new Task(task.value, date.value, Math.random().toString(16).slice(2));

    return  {
        title : newTask.getName(),
        dueDate : newTask.getDateFormatted(),
        taskId : newTask.getId()
    };  
}

export function addTaskToStorage() {
    // const tasks = Storage.getTask();
    let newTask = new Task(task.value, date.value, Math.random().toString(16).slice(2));
    tasks.addTask(newTask);
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));

    // Storage.addTask(newTask);
    // localStorage.setItem('task', JSON.stringify(Storage.getTask().getTasks()));

    // let tasks = Storage.getTask();
    // console.log(tasks.getTasks());

    // let taskList = JSON.parse(localStorage.getItem('task')) || [];
    // taskList.push(todoData());
    // localStorage.setItem('task', JSON.stringify(taskList));
}

export function removeTaskFromStorage(index) {
    // let tasks =  Storage.getTask();
    tasks.deleteTask(index);
    localStorage.setItem('task', JSON.stringify(tasks.getTasks()));
    

    // let taskList = JSON.parse(localStorage.getItem('task'))
    // taskList.splice(index, 1);
    // localStorage.setItem('task', JSON.stringify(taskList));
}   

export function editTaskInStorage(id, editTask, editDate) {
    let taskList = JSON.parse(localStorage.getItem('task'));
    taskList.forEach(item => {
        if(item.taskId === id) {
            item.title = editTask;
            item.dueDate = editDate;
        }
    });
    localStorage.setItem('task', JSON.stringify(taskList));
}

// function addProjectToStorage() {
//     let projects = JSON.parse(localStorage.getItem('project')) || [];
//     projects.push(new Project('name'))
// }