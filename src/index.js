import { format } from 'date-fns';
import MemoryManager from './MemoryManager';
import ProjectsManager from './ProjectsManager';
import createDisplay from './DisplayHandler';

localStorage.clear();

const init = (() => {
  const PM = new ProjectsManager();
  const memoryManager = MemoryManager();
  memoryManager.loadProjectsManager(PM);
  createDisplay(PM);
  return {
    PM,
  };
})();

// setTimeout(function() {console.log(init.PM);}, 5000);
