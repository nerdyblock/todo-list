import Task from "./task";

const task = document.getElementById('task');
const date = document.getElementById('date');



function todoData() {
    let newTask = new Task(task.value, date.value, Math.random().toString(16).slice(2));
    return  {
        title : newTask.getName(),
        dueDate : newTask.getDate(),
        taskId : newTask.getId()
    };  
}

export function addTaskToStorage() {
    let taskList = JSON.parse(localStorage.getItem('task')) || [];
    taskList.push(todoData());
    localStorage.setItem('task', JSON.stringify(taskList));
}

export function removeTaskFromStorage(index) {
    let taskList = JSON.parse(localStorage.getItem('task'))
    taskList.splice(index, 1);
    localStorage.setItem('task', JSON.stringify(taskList));
}   

