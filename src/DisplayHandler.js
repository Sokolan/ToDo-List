let PM;

const createHeader = () => {
  const header = document.createElement('div');
  header.classList.add('header');

  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'ToDo';

  header.appendChild(logo);

  return header;
};

// Show all tasks that match a filter
const createTasksSection = () => {
  const createTasksCategory = (sectionName, sectionClass) => {
    const tasksSection = document.createElement('button');
    tasksSection.classList.add(sectionClass);
    tasksSection.textContent = sectionName;
    return tasksSection;
  };
  const tasksSection = document.createElement('div');
  tasksSection.classList.add('tasks-section');
  tasksSection.appendChild(createTasksCategory('All Tasks', 'all-tasks'));
  tasksSection.appendChild(createTasksCategory('Today', 'today-tasks'));
  tasksSection.appendChild(createTasksCategory('This Week', 'week-tasks'));
  return tasksSection;
};

// Shows all projects and a button to add new projects
const createProjectsSection = () => {
  const createProjectsHeader = () => {
    const header = document.createElement('p');
    header.classList.add('projects-section-header');
    header.textContent = 'Projects';
    return header;
  };

  const createAddProject = () => {
    const createInputProject = () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'text');
      input.setAttribute('id', 'new-project');
      input.setAttribute('name', 'new-project');
      return input;
    };

    const createSubmitProjectButton = () => {
      const submit = document.createElement('button');
      submit.classList.add('add-project-submit');
      submit.textContent = '+';

      submit.addEventListener('click', () => {
        const input = document.querySelector('[id="new-project"]');
        PM.addProject(input.value);
        input.value = '';
      });
    };

    const addProject = document.createElement('div');
    addProject.classList.add('add-project-container');
    addProject.appendChild(createInputProject());
    addProject.appendChild(createSubmitProjectButton());

    return addProject;
  };

  const createProjectsContainer = () => {
    const projectsContainer = document.createElement('div');
    projectsContainer.classList.add('projects-container');
    return projectsContainer;
  };

  const projectsSction = document.createElement('div');
  projectsSction.classList.add('projects-section');
  projectsSction.appendChild(createProjectsHeader());
  projectsSction.appendChild(createAddProject());
  projectsSction.appendChild(createProjectsContainer());

  return projectsSction;
};

// Sidebar allows navigation throught different projects and tasks by filters
const createSideBar = () => {
  const sideBar = document.createElement('div');
  sideBar.classList.add('side-bar');
  sideBar.appendChild(createTasksSection());
  sideBar.appendChild(createProjectsSection());
};

// Main function that manages the creation of the DOM
const createDisplay = (projectsManager) => {
  PM = projectsManager;
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  content.appendChild(createSideBar());
};

export default createDisplay;
