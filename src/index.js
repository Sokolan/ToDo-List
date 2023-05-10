import { format } from 'date-fns';
import MemoryManager from './MemoryManager';
import ProjectsManager from './ProjectsManager';

const init = (() => {
  const PM = new ProjectsManager();
  const memoryManager = MemoryManager();
  memoryManager.loadProjectsManager(PM);
  return {
    PM,
  };
})();
