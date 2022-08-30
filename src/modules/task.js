export default class Task {
    constructor(name, dueDate, id, project="", status="") {
      this.name = name
      this.dueDate = dueDate
      this.id = id
      this.project = project
      this.status = status
    }
    
    setProject(projectName) {
      this.project = projectName
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