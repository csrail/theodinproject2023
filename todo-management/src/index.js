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

const ProjectCreator = () => {
    return (project = {}, tasks = []) => {
        const projectTitle = project['title']
        const projectDescription = project['description']
        const taskCollection = tasks

        const getProjectTitle = () => { return projectTitle }
        const getProjectDescription = () => { return projectDescription }
        const getTasks = () => { return taskCollection }

        return {
            getProjectTitle,
            getProjectDescription,
            getTasks,
        }
    }
}

const TaskCreator = () => {
    let taskCount = 1;

    return (task = {}) => {
        const taskId = taskCount
        taskCount++

        const _createDate = new Date();
        let _title = task['title'];
        let _description = task['description'];
        let _dueDate = task['dueDate'];
        let _isCompleted = task['isCompleted']

        const _getCreateDate = () => { return _createDate }

        const getTaskId = () => { return taskId }
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
    const id = document.createElement('div');
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
        getTaskButtonElement,
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
            getPassiveNavigationElement().appendChild(getTaskButtonElement())
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

const TaskProperties = (task = {}) => {
    const {
        getPropertiesElement,
    } = htmlMixin

    const getTitleInput = () => { return document.querySelector('#task-title') };
    const getDescriptionInput = () => { return document.querySelector('#task-description') };
    const getDueDateInput = () => { return document.querySelector('#task-due-date') };
    const getIsCompleted = () => { return document.querySelector('#task-is-completed') };

    const buildDeleteButton = () => {
        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';

        deleteButton.addEventListener('click', deleteTask);
        return deleteButton;
    }
    const buildSaveButton = () => {
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';

        saveButton.addEventListener('click', saveTask);
        return saveButton
    }

    const saveTask = () => {
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
        task.setDueDate(getDueDateInput().value);
        task.setIsCompleted(getIsCompleted().checked);
    }

    const deleteTask = () => {
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

const Dashboard = (projects) => {
    const {
        getPassiveNavigationElement,
        getProjectButtonElement,
        getHomeButtonElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
    } = htmlMixin

    const displayDefaultView = () => {
        getActiveNavigationElement().replaceChildren();
        _displayProjects();
    }

    const displayView = () => {
        getHomeButtonElement().addEventListener('click', () => {
            getPassiveNavigationElement().replaceChildren();
            getPassiveNavigationElement().appendChild(getHomeButtonElement());
            getActiveNavigationElement().replaceChildren();
            getCenterpieceElement().replaceChildren();
            getPropertiesElement().replaceChildren();
            _displayProjects();
        })
    }

    const _displayProjects = () => {
        projects.forEach((project) => {
            const projectSign = document.createElement('div');
            projectSign.textContent = project.getProjectTitle()

            projectSign.addEventListener('click', () => {
                getPassiveNavigationElement().appendChild(getProjectButtonElement());
                getActiveNavigationElement().replaceChildren();
                project.getTasks()
                    .forEach((task) => {
                        const taskViewer = TaskViewer(TaskSign(task))
                        taskViewer.displayTaskViews();
                    })
            })

            getActiveNavigationElement().appendChild(projectSign);
        })
    }

    return {
        displayDefaultView,
        displayView,
    }
}

const htmlMixin = (() => {
    const homeButtonElement = document.querySelector('#home');
    const passiveNavigationElement = document.querySelector('#passive-navigation');
    const activeNavigationElement = document.querySelector('#active-navigation');
    const centerpieceElement = document.querySelector('#centerpiece');
    const propertiesElement = document.querySelector('#properties');

    let projectButtonElement
    let taskButtonElement

    const _buildProjectButtonElement = () => {
        const projectButtonElement = document.createElement('button');
        projectButtonElement.id = 'project';
        projectButtonElement.textContent = 'PROJECT';
        return projectButtonElement
    }

    const _buildTaskButtonElement = () => {
        const taskButtonElement = document.createElement('button');
        taskButtonElement.id = 'task';
        taskButtonElement.textContent = 'TASK';
        return taskButtonElement
    }

    const getProjectButtonElement = () => {
        return projectButtonElement === void(0) ? _buildProjectButtonElement() : projectButtonElement
    }

    const getTaskButtonElement = () => {
        return taskButtonElement === void(0) ? _buildTaskButtonElement() : taskButtonElement
    }

    const getPassiveNavigationElement = () => { return passiveNavigationElement }
    const getHomeButtonElement = () => { return homeButtonElement }
    const getActiveNavigationElement = () => { return activeNavigationElement } // keyword: Panel
    const getCenterpieceElement = () => { return centerpieceElement }
    const getPropertiesElement = () => { return propertiesElement }

    return {
        getPassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getHomeButtonElement,
        getProjectButtonElement,
        getTaskButtonElement,
    }
})();

const main = (() => {

    const Task = TaskCreator()
    const taskCollection = []
    jsonTasks.forEach((item) => {
        const task = Task(item);
        taskCollection.push(task);
        const taskViewer = TaskViewer(TaskSign(task))
        taskViewer.displayTaskViews();
    })

    const Project = ProjectCreator()
    const projectCollection = []
    const project1 = Project({title: 'Mathematics', description: 'Study mathematics from high school up to first year university level.'}, taskCollection);
    const project2 = Project({title: 'Gardening', description: 'Pull out weeds.'});
    projectCollection.push(project1);
    projectCollection.push(project2);
    projectCollection.forEach((project) => {
        console.log(project.getProjectTitle())
        console.log(project.getTasks())
    })

    const dashboard =  Dashboard(projectCollection)
    dashboard.displayDefaultView()
    dashboard.displayView();

    return { }
})();