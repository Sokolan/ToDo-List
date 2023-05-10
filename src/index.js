import { format } from 'date-fns';
import MemoryManager from './MemoryManager';
import ProjectsManager from './ProjectsManager';
import createDisplay from './DisplayHandler';

const init = (() => {
  const PM = new ProjectsManager();
  const memoryManager = MemoryManager();
  memoryManager.loadProjectsManager(PM);
  createDisplay();
  return {
    PM,
  };
})();
