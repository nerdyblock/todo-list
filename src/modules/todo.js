import { isToday, isAfter, startOfTomorrow } from "date-fns";

export default class Todo {
    constructor() {
        this.tasks = [];
    }

   addTask(task) {
       this.tasks.push(task);
   }

   getTasks() {
       return this.tasks;
   }

   getTask(index) {
       return this.tasks[index];
   }

   findTask(id) {
       return this.tasks.find(item =>
           item.id == id);
   }

   setTasks(tasks) {
        this.tasks = tasks;
   }

   deleteTask(index) {
       this.tasks.splice(index, 1);
   }

   deleteTaskById(id) {
       let index = this.tasks.findIndex(item => item.id == id)
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

   getTodayTask() {
       return this.tasks.filter(task => {
            let taskDate = new Date(task.dueDate);
            return isToday(taskDate);
       })
   }

   getUpcomingTask() {
        return this.tasks.filter(task => {
            let taskDate = new Date(task.dueDate);
            return isAfter(taskDate, startOfTomorrow());
       })
   }

   getProjectTasks(projectName) {
       return this.tasks.filter(task => task.project === projectName)
   }
}
