"use strict"

import jsonTasks from './tasks.json';
import jsonProjects from './projects.json';
import { htmlMixin } from "./htmlMixin";
import { ProjectManager } from "./projects";
import { TaskManager } from "./tasks";

const ApplicationViewer = (...Views) => {
    const displayViews = () => {
        Views.forEach((view) => {
            view.displayView();
        })
    }

    return { displayViews }
}

const TaskContent = (task = {}) => {
    const {
        getCenterpieceElement,
    } = htmlMixin;

    const container = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');
    const id = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const dueDateLabel = document.createElement('label');
    const dueDateInput = document.createElement('input');
    const isCompletedLabel = document.createElement('label');
    const isCompletedInput = document.createElement('input');

    titleInput.id = 'task-title';
    descriptionInput.id ='task-description';
    dueDateInput.id = 'task-due-date';
    isCompletedInput.id = 'task-is-completed';

    const _buildTaskContent = () => {
        id.textContent = 'Task ' + task.getTaskId().toString() + ':';

        titleInput.value  = task.getTitle();

        descriptionLabel.textContent = 'Description:';
        descriptionInput.value = task.getDescription();

        dueDateLabel.textContent = 'Due Date:';
        dueDateInput.setAttribute('type', 'date');
        dueDateInput.value = task.getDueDate();

        isCompletedLabel.textContent = 'Completed?';
        isCompletedInput.setAttribute('type', 'checkbox');
        isCompletedInput.checked = task.getIsCompleted();

        header.appendChild(id);
        header.appendChild(titleInput);

        body.appendChild(descriptionLabel);
        body.appendChild(descriptionInput);

        body.appendChild(dueDateLabel);
        body.appendChild(dueDateInput);

        body.appendChild(isCompletedLabel);
        body.appendChild(isCompletedInput);

        container.appendChild(header);
        container.appendChild(body);

        return container
    }

    const displayView = () => {
        getCenterpieceElement().replaceChildren();
        getCenterpieceElement().appendChild(_buildTaskContent());
    }

    return { displayView }
}

const TaskSign = (project = {}, task = {}, ) => {
    const {
        getActiveNavigationElement,
        getPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const displayView = () => {
        let taskSign = document.createElement('div');

        const buildTaskSign = (sign) => {
            sign.id = ('task-sign-' + task.getTaskId().toString());
            sign.classList.add('task-sign');
        }
        const buildTaskSignLabel = (sign) => {
            sign.textContent = 'Task ' + task.getTaskId().toString() + ': ' + task.getTitle();
        }
        const appendTaskSign = (sign) => {
            getActiveNavigationElement().appendChild(sign);
        }

        const displayTask = () => {
            getPassiveNavigationElement().appendChild(getTaskPassiveNavigationElement())
            const taskView = ApplicationViewer(TaskContent(task), TaskProperties(project, task));
            taskView.displayViews();
        }

        buildTaskSign(taskSign);
        buildTaskSignLabel(taskSign);
        appendTaskSign(taskSign);

        taskSign.addEventListener('click', displayTask);
        return getActiveNavigationElement().appendChild(taskSign);
    }

    return { displayView }
}

const TaskProperties = (projectObject = {}, taskObject = {}) => {
    const {
        getPropertiesElement,
        getCenterpieceElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const getTitleInput = () => { return document.querySelector('#task-title') };
    const getDescriptionInput = () => { return document.querySelector('#task-description') };
    const getDueDateInput = () => { return document.querySelector('#task-due-date') };
    const getIsCompleted = () => { return document.querySelector('#task-is-completed') };

    const _buildPropertyButton = (text, listener) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', listener);
        return button;
    }

    const buildSaveButton = () => { return _buildPropertyButton('Save', _saveButtonListener) }
    const buildDeleteButton = () => { return _buildPropertyButton('Delete', _deleteButtonListener) }

    const _saveButtonListener = () => { return _saveTask(taskObject) }
    const _deleteButtonListener = () => { return _deleteTask(projectObject, taskObject) }

    const _saveTask = (task) => {
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
        task.setDueDate(getDueDateInput().value);
        task.setIsCompleted(getIsCompleted().checked);
    }

    const _deleteTask = (project, task) => {
        console.log('delete');
        project.deleteProjectTask(task);
        project.getTasks().forEach(task => console.log(task.getTitle()))
        _emptyView(project, task);
    }
    const displayView = () => {
        getPropertiesElement().replaceChildren();
        getPropertiesElement().appendChild(buildSaveButton());
        getPropertiesElement().appendChild(buildDeleteButton());
    }

    const _emptyView = (project, task) => {
        getPropertiesElement().replaceChildren();
        getCenterpieceElement().replaceChildren();
        const identifier = "#task-sign-" + task.getTaskId().toString()
        document.querySelector(identifier).remove();
        if (project.getTasks().length === 0) {
            getTaskPassiveNavigationElement().remove()
        }
    }

    return { displayView }
}

const Navigation = (projectList) => {
    const {
        getPassiveNavigationElement,
        getHomePassiveNavigationElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getNewProjectButtonElement,
    } = htmlMixin

    const displayDefaultView = () => {
        getActiveNavigationElement().replaceChildren();
        _displayDefaultProjects(projectList);
        getActiveNavigationElement().appendChild(getNewProjectButtonElement());
    }

    const _displayDefaultProjects = (projects) => {
       projects.forEach((project) => {
           getActiveNavigationElement().appendChild(_buildProjectSign(project));
       })
    }

    const initialiseHomeNavigation = () => {
        getHomePassiveNavigationElement().addEventListener('click', resetDashboard)
    }

    const resetDashboard = () => {
        getPassiveNavigationElement().replaceChildren();
        getPassiveNavigationElement().appendChild(getHomePassiveNavigationElement());
        getActiveNavigationElement().replaceChildren();
        getCenterpieceElement().replaceChildren();
        getPropertiesElement().replaceChildren();
        displayDefaultView(projectList);
    }

    const _buildProjectContent = (project) => {
        const content = document.createElement('div');
        content.textContent = project.getProjectDescription()
        return content
    }

    const _buildProjectSign = (project) => {
        const sign = document.createElement('div');
        sign.textContent = project.getProjectTitle()
        sign.addEventListener('click', () => {
            _updatePassiveNavigation(project);
            _updateActiveNavigation(project);
            _displayProjectContent(project);
        })

        return sign
    }

    const _displayProjectContent = (project) => {
        getCenterpieceElement().replaceChildren(_buildProjectContent(project));
    }

    const _updatePassiveNavigation = (project) => {
        getPassiveNavigationElement().appendChild(getProjectPassiveNavigationElement());
        getProjectPassiveNavigationElement().addEventListener('click', () => {
            getTaskPassiveNavigationElement().remove();
            getCenterpieceElement().replaceChildren(_buildProjectContent(project));
            getPropertiesElement().replaceChildren();
        })
    }
    const _updateActiveNavigation = (project) => {
        getActiveNavigationElement().replaceChildren();
        project.getTasks()
            .forEach((task) => {
                const taskViewer = ApplicationViewer(TaskSign(project, task))
                taskViewer.displayViews();
            })

    }

    return {
        displayDefaultView,
        initialiseHomeNavigation,
    }
}

const ProjectSigns = () => {

    return {}
}

const ProjectProperties = () => {

    return {}
}

const main = (() => {
    const taskManager = TaskManager(jsonTasks);
    const projectManager = ProjectManager(jsonProjects, taskManager.getTasks());
    taskManager.createTask({
        id: 3,
        projectId: 1,
        title: "Precalculus and Trigonometry",
        description: "Beyond Algebra II, this course prepares you to understand the relationship between triangles and objects that exist in different timespaces",
    });

    const task1 = taskManager.getTasks().find((task) => { return task.getTaskId() === 3 })
    projectManager.includeTaskInProject(task1);
    const navigation =  Navigation(projectManager.getProjects())
    navigation.displayDefaultView()
    navigation.initialiseHomeNavigation()

    return { }
})();