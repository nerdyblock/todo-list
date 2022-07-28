import Task from "./task";

const task = document.getElementById('task');
const date = document.getElementById('date');

function todoData() {
    return  {
        title : task.value,
        dueDate : date.value,
    };  
}

function addTaskToStorage() {
    let taskList = JSON.parse(localStorage.getItem('task')) || [];
    taskList.push(todoData());
    localStorage.setItem('task', JSON.stringify(taskList));
}

export default addTaskToStorage;