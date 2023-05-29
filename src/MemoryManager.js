import Task from "./Task";

export default function MemoryManager() {
  const saveProjects = (projectsNames) => {
    localStorage.setItem("projectsManager", JSON.stringify(projectsNames));
  };

  const saveTasks = (projectName, tasks) => {
    localStorage.setItem(`${projectName}`, JSON.stringify(tasks));
  };

  // const saveCurrentProject = (projectsManager) => {
  //   localStorage.setItem('currentProject', projectsManager.currentProject());
  // };

  const loadProject = (projectName, projectsManager) => {
    const tasks = JSON.parse(localStorage.getItem(projectName));
    if (!tasks) {
      return;
    }
    tasks.forEach((task) => {
      const newTask = new Task(...Object.values(task));
      //  addTask(name, dateDue, prio = 2, isDone = false, description = "") {
      projectsManager.addTask(
        newTask.name,
        newTask.dateDue,
        newTask.prio,
        newTask.isDone,
        newTask.description
      );
    });
  };

  const loadProjectsManager = (projectsManager) => {
    const projects = JSON.parse(localStorage.getItem("projectsManager"));
    if (!projects) {
      return;
    }
    projects
      .filter((project) => project.name !== "All Tasks")
      .forEach((project) => {
        projectsManager.addProject(project);
        projectsManager.setCurrentProject(project);
        loadProject(project, projectsManager);
      });
  };

  return {
    saveProjects,
    saveTasks,
    // saveCurrentProject,
    loadProjectsManager,
  };
}
