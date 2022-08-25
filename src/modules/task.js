export default class Task {
    constructor(name, dueDate, id, project="") {
      this.name = name
      this.dueDate = dueDate
      this.id = id
      this.project = project
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

    getDateFormatted() {
      const day = this.dueDate.split('-')[0]
      const month = this.dueDate.split('-')[1]
      const year = this.dueDate.split('-')[2]
      return `${year}-${month}-${day}`
    }
  }