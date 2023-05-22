import MemoryManager from "./MemoryManager";
import ProjectsManager from "./ProjectsManager";
import createDisplay from "./DisplayHandler";

localStorage.clear();

const PM = new ProjectsManager();
const memoryManager = MemoryManager();
memoryManager.loadProjectsManager(PM);
PM.addProject('hi');
PM.setCurrentProject('hi');
createDisplay(PM);

// setTimeout(function() {console.log(PM);}, 5000);
