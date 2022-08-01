export default class Task {
    constructor(name, dueDate, id) {
      this.name = name
      this.dueDate = dueDate
      this.id = id;
    }
  
    getId() {
      return this.id;
    }

    setName(name) {
      this.name = name
    }
  
    getName() {
      return this.name
    }
  
    setDate(dueDate) {
      this.dueDate = dueDate
    }
  
    getDate() {
      return this.dueDate
    }
  }