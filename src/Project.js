import Task from './Task';
import { compareAsc, compareDesc } from 'date-fns';

export default class Project {
  constructor(name) {
    this.name = name;
  }

  mTasks = [];

  get tasks() {
    return this.mTasks;
  }

  addTask(taskIn) {
    this.tasks.push(taskIn);
  }

  removeTask(index) {
    if (index < 0 || index > this.tasks.length) {
      console.log(`TASK INDEX (${index}) ERROR`);
    }
    this.tasks.splice(index, 1);
  }

  unfinishedTasks() {
    return this.tasks.reduce((sum, curr) => (curr.isDone ? sum + 1 : sum), 0);
  }

  sortTasksByDate(asc) {
    // Lower date means it's closer/smaller
    if (asc === true) {
      this.tasks.sort((lastOne, nextOne) => compareAsc(lastOne.dateDue, nextOne.dateDue));
    } else {
      this.tasks.sort((lastOne, nextOne) => compareDesc(lastOne.dateDue, nextOne.dateDue));
    }
  }

  sortTasksByName(asc) {
    if (asc === true) {
      this.tasks.sort((lastOne, nextOne) => (lastOne.name > nextOne ? 1 : -1));
    } else {
      this.tasks.sort((lastOne, nextOne) => (lastOne.name < nextOne ? 1 : -1));
    }
  }
}
