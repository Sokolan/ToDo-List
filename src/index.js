import ProjectsManager from './ProjectsManager';
import Task from './Task';

const projectsManager = new ProjectsManager();
projectsManager.addProject('project1');

for (let i = 0; i < 3; i += 1) {
  const date = new Date(1990, 1, 1);
  const task = new Task(`task${i}`, date);
  task.isDone = false;
  projectsManager.projects[0].addTask(task);
}

const date = new Date(1993, 1, 1);

projectsManager.projects[0].tasks[0].name = 'a';
projectsManager.projects[0].sortTasksByName(true);
console.log(projectsManager.projects[0].tasks);
