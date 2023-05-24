import MemoryManager from "./MemoryManager";
import ProjectsManager from "./ProjectsManager";
import createDisplay from "./DisplayHandler";

// localStorage.clear();

const PM = new ProjectsManager();
const memoryManager = MemoryManager();
memoryManager.loadProjectsManager(PM);
// PM.addProject('1');
// PM.setCurrentProject('1');
// PM.addTask("1", "2020-01-01", 1, true, "gho")
console.log(PM);
createDisplay(PM);

// setTimeout(function() {console.log(PM);}, 5000);
