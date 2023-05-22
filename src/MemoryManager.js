export default function MemoryManager() {
  const saveProjects = (projectsManager) => {
    localStorage.setItem(
      "projectsManager",
      JSON.stringify(projectsManager.projectsNames)
    );
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
      projectsManager.addTask(...Object.values(task));
    });
  };

  const loadProjectsManager = (projectsManager) => {
    const projects = JSON.parse(localStorage.getItem("projectsManager"));
    if (!projects) {
      return;
    }
    projects.forEach((project) => {
      projectsManager.addProject(project);
      projectsManager.setCurrentProject(project);
      loadProject(project);
    });
  };

  return {
    saveProjects,
    saveTasks,
    // saveCurrentProject,
    loadProjectsManager,
  };
}
