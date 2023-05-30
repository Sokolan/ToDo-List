import { endOfToday, endOfWeek } from "date-fns";

import Project from "./Project";
import Task from "./Task";
import MemoryManager from "./MemoryManager";

export default class ProjectsManager {
  constructor() {
    this.mProjects = [];
    const allTasksproject = new Project("All Tasks");
    this.mProjects.push(allTasksproject);
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
  mTasksId = 0;

  get currentProject() {
    return this.mCurrentProject;
  }

  setCurrentProject(projectName) {
    const newCurrent = this.mProjects.find(
      (project) => project.name === projectName
    );
    if (!newCurrent) {
      return;
    }
    this.mCurrentProject = newCurrent;
  }

  // Allows the user to get an array of availble projects in the system
  projectsNames() {
    const projects = [];
    this.mProjects.forEach((project) => projects.push(project.name));
    return projects;
  }

  projectsMemoryUpdate() {
    this.mMemoryManager.saveProjects(
      this.projectsNames().filter((projectName) => projectName !== "All Tasks")
    );
  }

  addProject(projectName) {
    if (
      projectName === "" ||
      this.mProjects.find((project) => project.name === projectName)
    ) {
      return 0;
    }

    const project = new Project(projectName);
    this.mProjects.push(project);
    this.projectsMemoryUpdate();
    return 1;
  }

  removeProject(projectName) {
    const index = this.mProjects.findIndex(
      (project) => project.name === projectName
    );
    const tasksToDelete = this.mProjects[index].tasks;
    tasksToDelete.forEach((task) => this.removeTask(task.id));
    this.mProjects.splice(index, 1);
    this.projectsMemoryUpdate();
  }

  // Get task from current project by ID
  getTask(id) {
    return this.mCurrentProject.tasks.find(
      (task) => task.id === Number.parseInt(id, 10)
    );
  }

  // Get tasks of current project
  getTasks() {
    return this.mCurrentProject.tasks;
  }

  // Get all tasks with due date of today
  tasksEndToday() {
    const today = endOfToday();
    const tasks = [];
    this.mProjects.forEach((project) =>
      tasks.push(...project.tasksToDate(today))
    );
    return tasks;
  }

  // Get all tasks with due date less than end of week
  tasksWeekRange() {
    const week = endOfWeek(new Date());
    const tasks = [];
    this.mProjects.forEach((project) =>
      tasks.push(...project.tasksToDate(week))
    );
    return tasks;
  }

  taskMemoryUpdate() {
    this.mMemoryManager.saveTasks(
      this.mCurrentProject.name,
      this.mCurrentProject.tasks
    );
  }

  // Adding task to current project
  addTask(name, dateDue, prio = 2, isDone = false, description = "") {
    console.log("add", this);
    const task = new Task(
      this.mTasksId,
      name,
      dateDue,
      prio,
      isDone,
      description
    );
    this.mTasksId += 1;
    this.mCurrentProject.addTask(task);
    this.mProjects
      .find((project) => project.name === "All Tasks")
      .addTask(task);
    this.taskMemoryUpdate();

    return task.id;
  }

  // removing task to current project
  removeTask(id) {
    this.mProjects
      .find(
        (project) =>
          project.tasks.find(
            (taskTmp) => taskTmp.id === Number.parseInt(id, 10)
          ) && project.name !== "All Tasks"
      )
      .removeTask(id);
    this.mProjects
      .find((project) => project.name === "All Tasks")
      .removeTask(id);
    this.taskMemoryUpdate();
  }

  // Edit task of current project
  editTask(id, name, dateDue = undefined, prio = 2, description = "") {
    console.log("edit", this);
    const oldTask = this.mCurrentProject.tasks.find((task) => task.id === id);
    let dueDateNew;
    if (dateDue === undefined) {
      dueDateNew = oldTask.dateDue;
    } else {
      dueDateNew = dateDue;
    }

    const task = new Task(
      id,
      name,
      dueDateNew,
      prio,
      oldTask.isDone,
      description
    );
    this.mProjects
      .find(
        (project) =>
          project.tasks.find((taskTmp) => taskTmp.id === oldTask.id) &&
          project.name !== "All Tasks"
      )
      .replaceTask(id, task);
    // this.mCurrentProject.replaceTask(id, task);
    this.mProjects
      .find((project) => project.name === "All Tasks")
      .replaceTask(id, task);
    this.taskMemoryUpdate();
  }

  // change status of task
  changeTaskStatus(id) {
    const taskTarger = this.mCurrentProject.tasks.find(
      (task) => task.id === Number.parseInt(id, 10)
    );
    taskTarger.isDone = !taskTarger.isDone;
  }
}
