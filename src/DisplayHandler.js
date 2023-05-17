import gitImg from './img/github.png';
import './style/style.css';
import './style/header.css';
import './style/footer.css';
import ProjectsManager from './ProjectsManager';

let PM;

// Header section of display
const createHeader = () => {
  const header = document.createElement('div');
  header.classList.add('header');

  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'ToDo';

  header.appendChild(logo);

  return header;
};

// Sidebar allows navigation throught different projects and tasks by filters
const createSideBar = () => {
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

    // Add project consist of field for name and submit button
    const createAddProject = () => {
      const createProject = (projectName) => {
        const project = document.createElement('button');
        project.classList.add('project');
        project.setAttribute('project-name', projectName);
        project.textContent = projectName;
        // ADD EVENT THAT TRIGGERS CHANGING OF MAIN SCREEN CURRENT PROJECT
        project.addEventListener('cllick', () => {});
        return project;
      };

      const createDeleteProjectButton = (projectName) => {
        const deleteButton = document.createElement('button');
        deleteButton.classList.add('delete-project');

        deleteButton.addEventListener('click', () => {
          const projectsContainer = document.querySelector('.projects-container');
          const project = document.querySelector(`[project-name=${projectName}]`);
          projectsContainer.removeChild(project);
          PM.removeProject(projectName);
        });

        return deleteButton;
      };

      const createProjectContainer = (projectName) => {
        const projectContainer = document.createElement('li');
        projectContainer.classList.add('project-contaienr');
        projectContainer.appendChild(createProject(projectName));
        projectContainer.appendChild(createDeleteProjectButton(projectName));
        return projectContainer;
      };

      // Name field
      const createInputProject = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'text');
        input.setAttribute('id', 'new-project');
        input.setAttribute('name', 'new-project');
        input.setAttribute('placeholder', 'Project Name');
        return input;
      };

      // Submit button
      const createSubmitProjectButton = () => {
        const submit = document.createElement('button');
        submit.classList.add('add-project-submit');
        submit.textContent = '+';

        submit.addEventListener('click', () => {
          const input = document.querySelector('[id="new-project"]');
          PM.addProject(input.value);
          createProjectContainer(input.value);
          input.value = '';
        });
        return submit;
      };

      const addProject = document.createElement('div');
      addProject.classList.add('add-project-container');
      addProject.appendChild(createInputProject());
      addProject.appendChild(createSubmitProjectButton());

      return addProject;
    };

    const createProjectsContainer = () => {
      const projectsContainer = document.createElement('ul');
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
  const sideBar = document.createElement('div');
  sideBar.classList.add('side-bar');
  sideBar.appendChild(createTasksSection());
  sideBar.appendChild(createProjectsSection());
  return sideBar;
};

// Currently displayed project section
const createMainDisplay = () => {
  const mainDisplay = document.createElement('div');
  return mainDisplay;
};

// Footer of display screen
const createFooter = () => {
  // Create git link with git icon
  const createGitLinkImg = () => {
    const gitLink = document.createElement('a');
    gitLink.setAttribute('href', 'https://github.com/Sokolan/ToDo-List');
    gitLink.setAttribute('target', '_blank');

    const gitIcon = new Image();
    gitIcon.src = gitImg;
    gitIcon.classList.add('git-img');
    gitLink.appendChild(gitIcon);
    return gitLink;
  };

  const createCreatorName = (creatorName) => {
    const creator = document.createElement('p');
    creator.classList.add('creator');
    creator.textContent = creatorName;
    return creator;
  };

  const footerContainer = document.createElement('div');
  footerContainer.classList.add('footer');

  footerContainer.appendChild(createGitLinkImg());
  footerContainer.appendChild(createCreatorName('Sokolan'));
  return footerContainer;
};

// Main function that manages the creation of the DOM
const createDisplay = (projectsManager) => {
  PM = projectsManager;
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
  content.appendChild(createSideBar());
  content.appendChild(createMainDisplay());
  content.appendChild(createFooter());
};

export default createDisplay;
