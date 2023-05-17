import {
  endOfToday,
  endOfWeek,
} from 'date-fns';

import Project from './Project';
import Task from './Task';
import MemoryManager from './MemoryManager';

export default class ProjectsManager {
  constructor() {
    this.mProjects = [];
    this.mMemoryManager = MemoryManager();
  }

  /*
    mCurrentProject will be the project that the user can interact with:
      - Add new task
      - Remove task
      - Edit task
    To interact with a different project user should select a different project
    with the setter.
  */
  mCurrentProject;

  get currentProject() {
    return this.mCurrentProject.name;
  }

  setCurrentProject(projectName) {
    const newCurrent = this.mProjects.find((project) => project.name === projectName);
    if (!newCurrent) {
      return;
    }
    this.mCurrentProject = newCurrent;
  }

  // Allows the user to get an array of availble projects in the system
  get projectsNames() {
    const projects = [];
    this.mProjects.forEach((project) => projects.push(project.name));
    return projects;
  }

  projectsMemoryUpdate() {
    this.mMemoryManager.saveProjects(this.projectsNames);
  }

  addProject(projectName) {
    const project = new Project(projectName);
    this.mProjects.push(project);
    this.projectsMemoryUpdate();
  }

  removeProject(projectName) {
    const index = this.mProjects.findIndex((project) => (project.name === projectName));
    this.projects.splice(index, 1);
    this.projectsMemoryUpdate();
  }

  // Get tasks of current project
  get tasks() {
    return this.mCurrentProject.tasks;
  }

  #tasksOfProject(projectName) {
    return this.mProjects.find((project) => (project.name === projectName)).tasks;
  }

  // Get all tasks from all projects
  allTasks() {
    const tasksTomorrow = [];
    this.mProjects.forEach((project) => {
      tasksTomorrow.push(...project.tasks);
    });
    return tasksTomorrow;
  }

  // Get all tasks with due date of today
  tasksEndToday() {
    const today = endOfToday();
    const tasks = [];
    this.mProjects.forEach((project) => tasks.push(...project.tasksToDate(today)));
    return tasks;
  }

  // Get all tasks with due date less than end of week
  tasksWeekRange() {
    const week = endOfWeek(new Date());
    const tasks = [];
    this.mProjects.forEach((project) => tasks.push(...project.tasksToDate(week)));
    return tasks;
  }

  taskMemoryUpdate() {
    this.mMemoryManager.saveTasks(this.mCurrentProject, this.#tasksOfProject(this.mCurrentProject));
  }

  // Adding task to current project
  addTask(name, dateDue, prio = '2', isDone = false, note = '') {
    const task = new Task(this.mCurrentProject.generateId(), name, dateDue, prio, isDone, note);
    this.mCurrentProject.addTask(task);
    this.taskMemoryUpdate();
  }

  // removing task to current project
  removeTask(id) {
    this.mCurrentProject.removeTask(id);
    this.taskMemoryUpdate();
  }

  // Edit task of current project
  editTask(id, name, dateDue = undefined, prio = '2', isDone = false, note = '') {
    const task = new Task(id, name, dateDue, prio, isDone, note);
    this.mCurrentProject.replaceTask(id, task);
    this.taskMemoryUpdate();
  }
}
