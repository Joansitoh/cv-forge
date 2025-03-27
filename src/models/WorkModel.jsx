class WorkModel {
  constructor() {
    this.id = Date.now();
    this.title = "";
    this.company = "";
    this.city = "";
    this.startDate = "";
    this.endDate = "";
    this.actually = false;
    this.tasks = [];
  }
}

export default WorkModel;
