export default class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    addTask(task) {
        this.tasks.push(task);
    }

    setTasks(tasks) {
        this.tasks = tasks;
    }

    getTasks() {
        return this.tasks;
    }

    getTask(index) {
        return this.tasks[index];
    }

    findTask(id) {
        let task = this.tasks.find(item =>
            item.id === id);
        return task;
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(item => item.id != id);
    }

    deleteTaskByIndex(index) {
        this.tasks.splice(index, 1);
    }

    editTask(editData) {
        this.tasks.forEach(item => {
            if(item.id === editData.id) {
                item.name = editData.name;
                item.dueDate = editData.dueDate;
            }
       });
    }
}