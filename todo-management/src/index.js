// who: self
// what: creating a small project management app that mirrors secret project, this todos app outlines the todos required to start a new TOP project, meta...
// when: in the morning, expected project management date on Friday evening
// where: at my workstation, orderly
// why: to handle local storage and deploy object-oriented principles: SOLID and practical object-oriented design
// how:

//needs a loader:
//import './style.css'

"use strict"

import jsonTasks from './tasks.json'
import jsonProjects from './projects.json'

const ProjectCreator = () => {
    return (project = {})=> {
        const projectId = project['id'];
        const projectTitle = project['title'];
        const projectDescription = project['description'];
        const taskCollection = [];

        const getProjectId = () => { return projectId }
        const getProjectTitle = () => { return projectTitle }
        const getProjectDescription = () => { return projectDescription }
        const getTasks = () => { return taskCollection }

        const collectProjectTask = (task) => { return taskCollection.push(task) }

        const deleteProjectTask = (task) => {
            const index = taskCollection.indexOf(task)
            return taskCollection.splice(index, 1);
        }

        return {
            getProjectId,
            getProjectTitle,
            getProjectDescription,
            getTasks,
            collectProjectTask,
            deleteProjectTask,
        }
    }
}

const TaskCreator = () => {
    let taskCount = 1;

    return (task = {}) => {
        const taskId = taskCount
        taskCount++

        const _createDate = new Date();
        const _taskId = task['id'];
        const _projectForeignKey = task['projectId']
        let _title = task['title'];
        let _description = task['description'];
        let _dueDate = task['dueDate'];
        let _isCompleted = task['isCompleted']

        const _getCreateDate = () => { return _createDate }

        const getTaskId = () => { return _taskId }
        const getProjectForeignKey = () => { return _projectForeignKey }
        const getTitle = () => { return _title }
        const getDescription = () => { return _description }
        const getFormattedCreateDate = () => { return _formatDate(_getCreateDate())}
        const getDueDate = () => { return _dueDate }
        const getIsCompleted = () => { return _isCompleted }

        const setTitle = (title) => { return _title = title }
        const setDescription = (description) => { return _description = description }
        const setDueDate = (date) => { return _dueDate = date }
        const setIsCompleted = (boolean) => { return _isCompleted = boolean }

        const _formatDate = (date) => { return date.toDateString() }

        return {
            getTaskId,
            getProjectForeignKey,
            getTitle,
            getDescription,
            getFormattedCreateDate,
            getDueDate,
            getIsCompleted,
            setTitle,
            setDescription,
            setDueDate,
            setIsCompleted,
        }
    }
}

const TaskViewer = (...taskViews) => {
    const displayTaskViews = () => {
        taskViews.forEach((view) => {
            view.displayView();
        })
    }

    return { displayTaskViews }
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

const TaskSign = (task = {}, ) => {
    const {
        getActiveNavigationElement,
        getPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const displayView = () => {
        let taskSign = document.createElement('div');

        const buildTaskSign = (sign) => {
            sign.classList.add('task-sign')
        }
        const buildTaskSignLabel = (sign) => {
            sign.textContent = 'Task ' + task.getTaskId().toString() + ': ' + task.getTitle();
        }
        const appendTaskSign = (sign) => {
            getActiveNavigationElement().appendChild(sign);
        }

        const displayTask = () => {
            getPassiveNavigationElement().appendChild(getTaskPassiveNavigationElement())
            const taskView = TaskViewer(TaskContent(task), TaskProperties(task));
            taskView.displayTaskViews();
        }

        buildTaskSign(taskSign);
        buildTaskSignLabel(taskSign);
        appendTaskSign(taskSign);

        taskSign.addEventListener('click', displayTask);
        return getActiveNavigationElement().appendChild(taskSign);
    }

    return { displayView }
}

const TaskProperties = (taskObject = {}) => {
    const {
        getPropertiesElement,
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
    const buildDeleteButton = () => { return _buildPropertyButton('Delete', _deleteTask) }

    const _saveButtonListener = () => { return _saveTask(taskObject) }

    const _saveTask = (task) => {
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
        task.setDueDate(getDueDateInput().value);
        task.setIsCompleted(getIsCompleted().checked);
    }

    const _deleteTask = (task) => {
        console.log('delete');
        // a collection keeps Tasks in memory
        // reference a collection
        // find object in collection
        // delete object altogether
        // delegate DOM to emptyView
    }
    const displayView = () => {
        getPropertiesElement().replaceChildren();
        getPropertiesElement().appendChild(buildSaveButton());
        getPropertiesElement().appendChild(buildDeleteButton());
    }

    const emptyView = () => {
        getPropertiesElement().replaceChildren();
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
    } = htmlMixin

    const displayDefaultView = () => {
        getActiveNavigationElement().replaceChildren();
        _displayDefaultProjects(projectList);
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
                const taskViewer = TaskViewer(TaskSign(task))
                taskViewer.displayTaskViews();
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

const ProjectManager = (projectCollection, taskCollection) => {
    const Project = ProjectCreator()
    const projects = []
    let tasks = taskCollection

    const _initialiseProjects = ((baseProjects) => {
        baseProjects.forEach((project) => {
            projects.push(Project(project));
        })

        return {}
    })(projectCollection);

    const _initialiseProjectTasks = ((baseProjects, baseTasks) => {
        baseProjects.forEach((project) => {
            baseTasks.forEach((task) => {
                if (task.getProjectForeignKey() === project.getProjectId()) {
                    project.collectProjectTask(task);
                }
            })
        })

        return {}
    })(projects, tasks);

    const getProjects = () => { return projects }

    return { getProjects }
}

const TaskManager = (taskCollection) => {
    const Task = TaskCreator()
    const tasks= []

    const initialiseTasks = ((collection) => {
        collection.forEach((item) => {
            tasks.push(Task(item));
        })

        return {}
    })(taskCollection);

    const displayTasks = (() => {
        tasks.forEach((task) => {
            TaskViewer(TaskSign(task))
                .displayTaskViews();
        })

        return {}
    })();

    const getTasks = () => { return tasks }

    return { getTasks }
}

const htmlMixin = (() => {
    const homePassiveNavigationElement = document.querySelector('#home');
    const passiveNavigationElement = document.querySelector('#passive-navigation');
    const activeNavigationElement = document.querySelector('#active-navigation');
    const centerpieceElement = document.querySelector('#centerpiece');
    const propertiesElement = document.querySelector('#properties');

    let projectPassiveNavigationElement
    let taskPassiveNavigationElement

    const _buildProjectButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'project';
        button.textContent = 'PROJECT';
        return projectPassiveNavigationElement = button
    }

    const _buildTaskButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'task';
        button.textContent = 'TASK';
        return taskPassiveNavigationElement = button
    }

    const getProjectPassiveNavigationElement = () => {
        return projectPassiveNavigationElement === void(0) ? _buildProjectButtonElement() : projectPassiveNavigationElement
    }

    const getTaskPassiveNavigationElement = () => {
        return taskPassiveNavigationElement === void(0) ? _buildTaskButtonElement() : taskPassiveNavigationElement
    }

    const getPassiveNavigationElement = () => { return passiveNavigationElement }
    const getHomePassiveNavigationElement = () => { return homePassiveNavigationElement }
    const getActiveNavigationElement = () => { return activeNavigationElement } // keyword: Panel
    const getCenterpieceElement = () => { return centerpieceElement }
    const getPropertiesElement = () => { return propertiesElement }

    return {
        getPassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getHomePassiveNavigationElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    }
})();

const main = (() => {
    const taskManager = TaskManager(jsonTasks);
    const projectManager = ProjectManager(jsonProjects, taskManager.getTasks())

    const navigation =  Navigation(projectManager.getProjects())
    navigation.displayDefaultView(projectManager.getProjects())
    navigation.initialiseHomeNavigation()

    return { }
})();