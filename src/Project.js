import { compareAsc, compareDesc, isBefore, parseISO } from "date-fns";

export default class Project {
  constructor(name) {
    this.mName = name;
  }

  mId = 0;

  get name() {
    return this.mName;
  }

  mTasks = [];

  get tasks() {
    return this.mTasks;
  }

  generateId() {
    this.mId += 1;
    return this.mId - 1;
  }

  addTask(task) {
    this.mTasks.push(task);
  }

  removeTask(id) {
    if (id < 0 || id > this.mId) {
      console.log(`ILLEGAL ID: ${id}`);
    }
    this.mTasks = this.mTasks.filter((task) => task.id !== id);
  }

  replaceTask(targetId, newTask) {
    for (let i = 0; i < this.mTasks.length; i += 1) {
      if (this.mTasks[i].id === targetId) {
        this.mTasks[i] = newTask;
        break;
      }
    }
  }

  unfinishedTasks() {
    return this.tasks.reduce((sum, curr) => (curr.isDone ? sum + 1 : sum), 0);
  }

  tasksToDate(date) {
    return this.tasks.filter((task) => isBefore(parseISO(task.dateDue), date));
  }

  sortTasksByDate(asc) {
    // Lower date means it's closer/smaller
    if (asc === true) {
      this.tasks.sort((a, b) =>
        compareAsc(parseISO(a.dateDue), parseISO(b.dateDue))
      );
    } else {
      this.tasks.sort((a, b) =>
        compareDesc(parseISO(a.dateDue), parseISO(b.dateDue))
      );
    }
  }

  sortTasksByName(asc) {
    if (asc === true) {
      this.tasks.sort((a, b) => (a.name > b ? 1 : -1));
    } else {
      this.tasks.sort((a, b) => (a.name < b ? 1 : -1));
    }
  }
}
