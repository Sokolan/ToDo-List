export default class Task {
  constructor(id, name, dateDue, prio = '2', isDone = false, description = '') {
    this.id = id;
    this.name = name;
    this.dateDue = dateDue;
    // Prio: 1-highest, 2-medium, 3-low
    this.prio = prio;
    this.isDone = isDone;
    this.description = description;
  }
}
