import gitImg from "./img/github.png";
import addTaskImg from "./img/add-task.png";
import expandTask from "./img/expand.png";
import minimizeTask from "./img/minimize.png";
import editTask from "./img/edit-button.png";
import deleteTask from "./img/delete-button.png";
import "./style/style.css";
import "./style/header.css";
import "./style/mainDisplay.css";
import "./style/footer.css";
import "./style/sideBar.css";

let PM;

// Creates and adds a task to tasks container
const createNewTask = (
  id,
  name,
  dueDate,
  prio,
  description,
  isDone = false
) => {
  const createTaskButtons = () => {
    const createButton = (buttonName, buttonImg) => {
      const button = document.createElement("button");
      button.classList.add(buttonName);

      const taskImg = new Image();
      taskImg.src = buttonImg;

      button.appendChild(taskImg);
      return button;
    };
    // Create container for edit, delete and expand buttons
    const taskButtons = document.createElement("div");
    taskButtons.classList.add("task-buttons-container");

    const expandButton = createButton("resize-task", expandTask);
    expandButton.addEventListener("click", (event) => {
      // Get the task container and the img of resizing the task
      const taskContainer = event.currentTarget.parentElement.parentElement;

      let taskDescription = document.querySelector(
        `.task-container[id="${taskContainer.id}"] > p.task-description`
      );
      const resizeImg = document.querySelector(
        `.task-container[id="${taskContainer.id}"] .resize-task > img`
      );
      if (taskDescription === null) {
        taskDescription = document.createElement("p");
        taskDescription.classList.add("task-description");
        taskDescription.textContent = PM.getTask(taskContainer.id).description;
        taskContainer.appendChild(taskDescription);
        resizeImg.src = minimizeTask;
      } else {
        taskDescription.remove();
        resizeImg.src = expandTask;
      }
    });

    const editButton = createButton("edit-task", editTask);
    editButton.addEventListener("click", (event) => {
      const form = createNewTaskForm(id, name, dueDate, prio, description);
      const taskContainer = event.currentTarget.parentElement.parentElement;
      taskContainer.insertAdjacentElement("afterEnd", form);
      taskContainer.remove();
    });

    const deleteButton = createButton("delete-task", deleteTask);
    deleteButton.addEventListener("click", (event) => {
      event.stopPropagation();
      // delete-button -> buttons-container -> task-container
      const taskContainer = event.currentTarget.parentElement.parentElement;
      PM.removeTask(taskContainer.id);
      event.currentTarget.parentElement.parentElement.remove();
    });

    taskButtons.appendChild(expandButton);
    taskButtons.appendChild(editButton);
    taskButtons.appendChild(deleteButton);
    return taskButtons;
  };
  // Container of the tasks
  const container = document.querySelector(".tasks-container");
  // Create the task to add
  const task = document.createElement("div");
  task.classList.add("task-container");
  task.setAttribute("id", id);

  // Task prio
  task.setAttribute("task-prio", `${prio}`);

  // Create checkmark for changing completeness status
  const taskIsDone = document.createElement("input");
  taskIsDone.setAttribute("type", "checkbox");
  if (isDone) {
    taskIsDone.checked = true;
  }
  taskIsDone.addEventListener("click", (event) => {
    const taskContainer = event.target.parentElement;
    PM.changeTaskStatus(taskContainer.id);
    console.log(PM);
  });
  task.appendChild(taskIsDone);

  // Task name
  const taskName = document.createElement("p");
  taskName.classList.add("task-name");
  taskName.textContent = name;
  task.appendChild(taskName);

  // Task due date
  const taskDueDate = document.createElement("p");
  taskDueDate.classList.add("task-due-date");
  taskDueDate.textContent = dueDate;
  task.appendChild(taskDueDate);

  // Create edit and delete buttons
  task.appendChild(createTaskButtons());

  container.appendChild(task);
};

// Creates and returns a form for new task
const createNewTaskForm = (
  taskId = -1,
  taskName = "aaa",
  taskDueDate = "2022-01-01",
  taskPrio = 1,
  taskDescription = "Add Description"
) => {
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
    const addRadio = (fieldset, id, text, value, checked) => {
      const radio = document.createElement("input");
      radio.setAttribute("type", "radio");
      radio.setAttribute("id", id);
      radio.setAttribute("value", value);
      radio.setAttribute("name", "task-priority-form");
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
    const taskPrioNum = Number.parseInt(taskPrio, 10);
    addRadio(fieldset, "low-prio", "Low", 3, taskPrioNum === 3);
    addRadio(fieldset, "medium-prio", "Medium", 2, taskPrioNum === 2);
    addRadio(fieldset, "high-prio", "High", 1, taskPrioNum === 1);
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
      // Get task info from form
      const taskNameSubmit = document.querySelector("#task-name-form").value;
      const taskDueDateSubmit = document.querySelector(
        "#task-due-date-form"
      ).value;
      const taskPrioSubmit = document.querySelector(
        '[name="task-priority-form"]:checked'
      ).value;
      const taskDescriptionSubmit = document.querySelector(
        "#task-description-form"
      ).value;

      let taskIdSubmit;
      if (taskId !== -1) {
        PM.editTask(
          taskId,
          taskNameSubmit,
          taskDueDateSubmit,
          taskPrioSubmit,
          taskDescriptionSubmit
        );
        taskIdSubmit = taskId;
      }
      // Else taskId is -1 so we're creating a new task
      else {
        taskIdSubmit = PM.addTask(
          taskNameSubmit,
          taskDueDateSubmit,
          taskPrioSubmit,
          false,
          taskDescriptionSubmit
        );
      }
      if (taskId !== -1) {
        taskIdSubmit = taskId;
      }
      document.querySelector("form").remove();
      createNewTask(
        taskIdSubmit,
        taskNameSubmit,
        taskDueDateSubmit,
        taskPrioSubmit,
        taskDescription
      );
      if (
        document.querySelector("form") === null &&
        document.querySelector(".project-header").textContent !== "All Tasks"
      ) {
        document.querySelector(".add-task-container").style.display = "block";
      }
      console.log(PM);
    });
    return submitButton;
  };

  // Create the form element
  const form = document.createElement("form");
  form.setAttribute("id", "new-task-form");

  // Disable creation of another form
  document.querySelector(".add-task-container").style.display = "none";

  // Create name and adds a value incase one provided
  const taskNameFormField = createInputField(
    "text",
    "task-name-form",
    "Task Name"
  );
  if (taskName !== "") {
    taskNameFormField.value = taskName;
  }
  form.appendChild(taskNameFormField);
  // Create due date and adds a default value
  const dueDateFormField = createInputField(
    "date",
    "task-due-date-form",
    taskDueDate
  );
  dueDateFormField.setAttribute("value", taskDueDate);
  form.appendChild(dueDateFormField);

  form.appendChild(createPrioField());

  form.appendChild(
    createInputField("text", "task-description-form", taskDescription)
  );

  form.appendChild(createFormSubmitButton());
  return form;
};

// Change current project displayed
const updateCurrentProject = (projectName, projectType = "regular") => {
  // Creates header with project name for main display
  const createProjectHeader = () => {
    const projectHeader = document.createElement("p");
    projectHeader.classList.add("project-header");
    projectHeader.textContent = projectName;
    return projectHeader;
  };

  const createControls = () => {
    const createAddTask = () => {
      // Create the button container
      const addTaskContainer = document.createElement("button");
      addTaskContainer.classList.add("add-task-container");

      // Set image
      const taskImg = new Image();
      taskImg.src = addTaskImg;
      addTaskContainer.appendChild(taskImg);

      // Clicking the button will open a form to fill to add a task
      addTaskContainer.addEventListener("click", () => {
        const referenceElement = document.querySelector(".project-header");
        referenceElement.insertAdjacentElement("afterEnd", createNewTaskForm());
      });
      return addTaskContainer;
    };
    const controls = document.createElement("div");
    controls.classList.add("project-controls");
    const addTaskButton = createAddTask();
    if (projectType !== "regular") {
      addTaskButton.style.display = "none";
    }
    controls.appendChild(addTaskButton);
    return controls;
  };

  // Create The tasks of the current project
  const createTasksContainer = () => {
    const tasksContainer = document.createElement("div");
    tasksContainer.classList.add("tasks-container");

    return tasksContainer;
  };

  // Adds all tasks of the current project
  const addTasksToScreen = () => {
    const tasks = PM.getTasks();
    // Create DOM element for each task and adds it to tasksContainer
    tasks.forEach((task) => {
      createNewTask(
        task.id,
        task.name,
        task.dateDue,
        task.prio,
        task.description,
        task.isDone
      );
    });
  };

  PM.setCurrentProject(projectName);
  const mainDisplay = document.querySelector(".main-display");
  mainDisplay.replaceChildren("");
  mainDisplay.appendChild(createProjectHeader());
  mainDisplay.appendChild(createControls());
  mainDisplay.appendChild(createTasksContainer());

  addTasksToScreen();
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
    // Get all tasks from all projects
    const allTasks = createTasksCategory("All Tasks", "all-tasks");
    allTasks.addEventListener("click", () => {
      updateCurrentProject("All Tasks", "all");
    });
    tasksSection.appendChild(allTasks);
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

    // Creates a project ready to be added to projects container
    const createProjectContainer = (projectName) => {
      const createProject = () => {
        const project = document.createElement("button");
        project.classList.add("project");
        project.setAttribute("project-name", projectName);
        project.textContent = projectName;
        project.addEventListener("click", () => {
          updateCurrentProject(projectName);
        });
        return project;
      };
      const createDeleteProjectButton = () => {
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
          if (PM.currentProject.name === projectName) {
            document.querySelector(".main-display").replaceChildren();
          }
          PM.removeProject(projectName);
        });

        return deleteButton;
      };
      const projectContainer = document.createElement("li");
      projectContainer.classList.add("project-container");
      projectContainer.appendChild(createProject(projectName));
      projectContainer.appendChild(createDeleteProjectButton(projectName));
      return projectContainer;
    };

    // Add project consist of field for name and submit button
    const createAddProject = () => {
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
          if (PM.addProject(input.value) === 0) {
            return;
          }
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
    const createProjectsContainerAndExistingProjects = () => {
      const projectsContainer = document.createElement("ul");
      projectsContainer.classList.add("projects-container");
      const projects = PM.projectsNames();
      projects
        .filter((project) => project !== "All Tasks")
        .forEach((project) => {
          projectsContainer.appendChild(createProjectContainer(project));
        });
      return projectsContainer;
    };

    const projectsSction = document.createElement("div");
    projectsSction.classList.add("projects-section");
    projectsSction.appendChild(createProjectsHeader());
    projectsSction.appendChild(createAddProject());
    projectsSction.appendChild(createProjectsContainerAndExistingProjects());
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
