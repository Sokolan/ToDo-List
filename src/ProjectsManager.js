import Project from './Project';

export default class ProjectsManager {
  constructor() {
    this.mProjects = [];
  }

  get projects() {
    return this.mProjects;
  }

  addProject(projectName) {
    const project = new Project(projectName);
    this.projects.push(project);
  }

  removeProject(index) {
    this.projects.splice(index, 1);
  }
}
