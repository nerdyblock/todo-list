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
        return this.tasks.find(item =>
            item.id === id);
    }

    deleteTask(id) {
        this.tasks = this.tasks.filter(item => item != id);
    }

    deleteTaskByIndex(index) {
        this.tasks.splice(index, 1);
    }
}