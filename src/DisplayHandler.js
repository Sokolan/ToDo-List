import gitImg from "./img/github.png";
import addTaskImg from "./img/add-task.png";
import "./style/style.css";
import "./style/header.css";
import "./style/mainDisplay.css";
import "./style/footer.css";
import "./style/sideBar.css";

let PM;

const createNewTaskForm = () => {
  // Create form field
  const createInputField = (type, id, placeholder = "") => {
    const inputField = document.createElement("input");
    inputField.setAttribute("type", type);
    inputField.setAttribute("id", id);
    if (placeholder !== "") {
      inputField.setAttribute("placeholder", placeholder);
    }
    return inputField;
  };
  // Create priority radio fields
  const createPrioField = () => {
    const addRadio = (fieldset, id, text, value, checked = false) => {
      const radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.setAttribute("id", id);
      radio.setAttribute("value", value);
      radio.setAttribute("name", "task-priority");
      if (checked) {
        radio.checked = true;
      }
      fieldset.appendChild(radio);

      const radioLabel = document.createElement("label");
      radioLabel.setAttribute("for", value);
      radioLabel.textContent = text;
      fieldset.appendChild(radioLabel);
    };

    const fieldset = document.createElement("fieldset");
    const legend = document.createElement("legend");
    legend.textContent = "Task Priority";
    addRadio(fieldset, "low-prio", "Low", 3);
    addRadio(fieldset, "medium-prio", "Medium", 2, true);
    addRadio(fieldset, "high-prio", "High", 1);
    fieldset.appendChild(legend);
    return fieldset;
  };
  // Create submit button
  const createFormSubmitButton = () => {
    const submitButton = document.createElement("button");
    submitButton.setAttribute("type", "submit");
    submitButton.setAttribute("form", "new-task-form");
    submitButton.textContent = "Add Task";

    submitButton.addEventListener("click", (event) => {
      // Prevent from default behaviour of submit button
      event.preventDefault();
      // Find active prio
      
      // AddTask(name, dateDue, prio = '2', isDone = false, note = '')
      PM.addTask(
        document.querySelector("#task-name").value,
        document.querySelector("#task-due-date").value,
        document.querySelector('[name="task-priority"]:checked').value,
        false,
        document.querySelector('#task-description').value
      );
      document.querySelector('form').remove();
    });
    return submitButton;
  };

  const form = document.createElement("form");
  form.setAttribute("id", "new-task-form");

  form.appendChild(createInputField("text", "task-name", "Task Name"));
  form.appendChild(createInputField("date", "task-due-date", ""));
  form.appendChild(createPrioField());
  form.appendChild(
    createInputField("text", "task-description", "Add description")
  );

  form.appendChild(createFormSubmitButton());
  return form;
};

// Change current project displayed
const updateCurrentProject = (projectName, dummyProject = false) => {
  // Creates header with project name for main display
  const createProjectHeader = () => {
    const projectHeader = document.createElement("p");
    projectHeader.classList.add("project-header");
    projectHeader.textContent = projectName;
    return projectHeader;
  };

  const createControls = () => {
    const createAddTask = () => {
      const addTaskContainer = document.createElement("button");
      addTaskContainer.classList.add("add-task-container");

      const taskImg = new Image();
      taskImg.src = addTaskImg;

      addTaskContainer.appendChild(taskImg);
      addTaskContainer.addEventListener("click", () => {
        const newTaskButton = document.querySelector('.add-task-container');
        const referenceElement = document.querySelector('.project-header');
        referenceElement.insertAdjacentElement('afterEnd', createNewTaskForm());
      });
      return addTaskContainer;
    };
    const controls = document.createElement("div");
    controls.classList.add("project-controls");

    controls.appendChild(createAddTask());
    return controls;
  };

  // Create The tasks of the current project
  const createTasks = () => {
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");
    const tasks = PM.getTasks();

    // Create DOM element for each task and adds it to tasksContainer
    tasks.forEach((task) => {
      // Create the container for the task
      const taskContainer = document.createElement("div");
      taskContainer.classList.add("task-container");

      // Is task done
      const taskStatus = document.createElement("div");
      taskStatus.classList.add("task-status");
      if (task.isDone) {
        taskStatus.classList.add("done");
      } else {
        taskStatus.classList.add("not-done");
      }
      taskContainer.appendChild(taskStatus);

      // Task name
      const taskName = document.createElement("div");
      taskName.classList.add("task-name");
      taskName.textContent = task.name;
      taskContainer.appendChild(taskName);

      // Task Date
      const taskDate = document.createElement("div");
      taskDate.classList.add("task-date");
      taskDate.textContent = task.dateDue;
      taskContainer.appendChild(taskDate);

      // task edit and remove buttuns
      const taskButtons = document.createElement("div");
      taskButtons.classList.add("task-buttons-container");

      const editButton = document.createElement("button");
      editButton.classList.add("task-edit");
      taskButtons.appendChild(editButton);

      const removeButton = document.createElement("button");
      removeButton.classList.add("task-remove");
      editButton.appendChild(removeButton);

      taskContainer.appendChild(taskButtons);
      // TODO: add functionality to addTask and removeTask

      // Tasl description
      const taskDescription = document.createElement("p");
      taskDescription.classList.add("task-description");
      taskContainer.appendChild(taskDescription);

      tasksContainer.appendChild(taskContainer);
    });

    return tasksContainer;
  };

  PM.setCurrentProject(projectName);
  const mainDisplay = document.querySelector(".main-display");
  mainDisplay.replaceChildren("");
  mainDisplay.appendChild(createProjectHeader());
  mainDisplay.appendChild(createControls());
  mainDisplay.appendChild(createTasks());
};

// Header section of display
const createHeader = () => {
  const header = document.createElement("div");
  header.classList.add("header");

  const logo = document.createElement("div");
  logo.classList.add("logo");
  logo.textContent = "ToDo - Projects Manager App";

  header.appendChild(logo);

  return header;
};

// Sidebar allows navigation throught different projects and tasks by filters
const createSideBar = () => {
  // Show all tasks that match a filter
  const createTasksSection = () => {
    const createTasksCategory = (sectionName, sectionClass) => {
      const tasksSection = document.createElement("button");
      tasksSection.classList.add(sectionClass);
      tasksSection.textContent = sectionName;
      return tasksSection;
    };
    const tasksSection = document.createElement("div");
    tasksSection.classList.add("tasks-section");
    tasksSection.appendChild(createTasksCategory("All Tasks", "all-tasks"));
    tasksSection.appendChild(createTasksCategory("Today", "today-tasks"));
    tasksSection.appendChild(createTasksCategory("This Week", "week-tasks"));
    return tasksSection;
  };

  // Shows all projects and a button to add new projects
  const createProjectsSection = () => {
    const createProjectsHeader = () => {
      const header = document.createElement("p");
      header.classList.add("projects-section-header");
      header.textContent = "Projects";
      return header;
    };

    // Add project consist of field for name and submit button
    const createAddProject = () => {
      const createProject = (projectName) => {
        const project = document.createElement("button");
        project.classList.add("project");
        project.setAttribute("project-name", projectName);
        project.textContent = projectName;
        project.addEventListener("click", () => {
          updateCurrentProject(projectName);
        });
        return project;
      };

      const createDeleteProjectButton = (projectName) => {
        const deleteButton = document.createElement("button");
        deleteButton.classList.add("delete-project");
        deleteButton.textContent = "X";

        deleteButton.addEventListener("click", () => {
          const projectsContainer = document.querySelector(
            ".projects-container"
          );
          const project = document.querySelector(
            `[project-name="${projectName}"]`
          );
          projectsContainer.removeChild(project.parentElement);
          PM.removeProject(projectName);
        });

        return deleteButton;
      };

      const createProjectContainer = (projectName) => {
        const projectContainer = document.createElement("li");
        projectContainer.classList.add("project-container");
        projectContainer.appendChild(createProject(projectName));
        projectContainer.appendChild(createDeleteProjectButton(projectName));
        return projectContainer;
      };

      // Name field
      const createInputProject = () => {
        const input = document.createElement("input");
        input.setAttribute("type", "text");
        input.setAttribute("id", "new-project");
        input.setAttribute("name", "new-project");
        input.setAttribute("placeholder", "Project Name");
        return input;
      };

      // Submit button
      const createSubmitProjectButton = () => {
        const submit = document.createElement("button");
        submit.classList.add("add-project-submit");
        submit.textContent = "+";

        submit.addEventListener("click", () => {
          const input = document.querySelector('[id="new-project"]');
          PM.addProject(input.value);
          const projectsList = document.querySelector(".projects-container");
          projectsList.appendChild(createProjectContainer(input.value));
          input.value = "";
        });
        return submit;
      };

      const addProject = document.createElement("div");
      addProject.classList.add("add-project-container");
      addProject.appendChild(createInputProject());
      addProject.appendChild(createSubmitProjectButton());

      return addProject;
    };

    // List of projects in the system
    const createProjectsContainer = () => {
      const projectsContainer = document.createElement("ul");
      projectsContainer.classList.add("projects-container");
      return projectsContainer;
    };

    const projectsSction = document.createElement("div");
    projectsSction.classList.add("projects-section");
    projectsSction.appendChild(createProjectsHeader());
    projectsSction.appendChild(createAddProject());
    projectsSction.appendChild(createProjectsContainer());

    return projectsSction;
  };
  const sideBar = document.createElement("div");
  sideBar.classList.add("side-bar");
  sideBar.appendChild(createTasksSection());
  sideBar.appendChild(createProjectsSection());
  return sideBar;
};

// Currently displayed project section
const createMainDisplay = () => {
  const mainDisplay = document.createElement("div");
  mainDisplay.classList.add("main-display");

  return mainDisplay;
};

// Footer of display screen
const createFooter = () => {
  // Create git link with git icon
  const createGitLinkImg = () => {
    const gitLink = document.createElement("a");
    gitLink.setAttribute("href", "https://github.com/Sokolan/ToDo-List");
    gitLink.setAttribute("target", "_blank");

    const gitIcon = new Image();
    gitIcon.src = gitImg;
    gitIcon.classList.add("git-img");
    gitLink.appendChild(gitIcon);
    return gitLink;
  };

  const createCreatorName = (creatorName) => {
    const creator = document.createElement("p");
    creator.classList.add("creator");
    creator.textContent = creatorName;
    return creator;
  };

  const footerContainer = document.createElement("div");
  footerContainer.classList.add("footer");

  footerContainer.appendChild(createGitLinkImg());
  footerContainer.appendChild(createCreatorName("Sokolan"));
  return footerContainer;
};

// Main function that manages the creation of the DOM
const createDisplay = (projectsManager) => {
  PM = projectsManager;
  const content = document.querySelector("#content");
  content.appendChild(createHeader());
  content.appendChild(createSideBar());
  content.appendChild(createMainDisplay());
  content.appendChild(createFooter());
};

export default createDisplay;
