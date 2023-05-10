const createHeader = () => {
  const header = document.createElement('div');
  header.classList.add('header');

  const logo = document.createElement('div');
  logo.classList.add('logo');
  logo.textContent = 'ToDo';

  header.appendChild(logo);

  return header;
};

const createTasksSection = (sectionName, sectionClass) => {
  const tasksSection = document.createElement('button');
  tasksSection.classList.add('tasks-section');
  tasksSection.classList.add(sectionClass);
  tasksSection.textContent = sectionName;
  return tasksSection;
}

const createSideBar = () => {
  const sideBar = document.createElement('div');
  sideBar.classList.add('side-bar');

  sideBar.appendChild(createTasksSection('All Tasks', 'all-tasks'));
  sideBar.appendChild(createTasksSection('Today', 'today-tasks'));
  sideBar.appendChild(createTasksSection('This Week', 'week-tasks'));
};

const createDisplay = () => {
  const content = document.querySelector('#content');
  content.appendChild(createHeader());
};

export default createDisplay;
