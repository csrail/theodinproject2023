// who: self
// what: creating a small project management app that mirrors secret project, this todos app outlines the todos required to start a new TOP project, meta...
// when: in the morning, expected project management date on Friday evening
// where: at my workstation, orderly
// why: to handle local storage and deploy object-oriented principles: SOLID and practical object-oriented design
// how:
// package.json and webpack setup
// create dashboard
// create todos
// create projects
// todos belong to projects
// show all projects
// show project count
// show all todos of a project
// show all todos count
// dashboard design like Overwatch
// dashboard has projects
// dashboard has starred project
// dashboard has today's todos shown
// todos have types
// todos have an exploration type
// todos have an expedition type
// todos have an expression type

//needs a loader:
//import './style.css'

//works natively:
//import Data from './data.json'
"use strict"

import jsonTasks from './tasks.json'

const TaskCreator = () => {
    let taskCount = 1

    return (obj = {}) => {
        const taskId = taskCount
        taskCount++

        const _createDate = new Date();
        let _title = obj['title'];
        let _description = obj['description'];

        const getTaskId = () => { return taskId }
        const getTitle = () => { return _title }
        const getDescription = () => { return _description }
        const setTitle = (title) => { return _title = title }
        const setDescription = (description) => { return _description = description }
        const _getCreateDate = () => { return _createDate }
        const _formatDate = (date) => { return date.toDateString() }
        const getFormattedCreateDate = () => { return _formatDate(_getCreateDate())}

        return {
            getTaskId,
            getTitle,
            getDescription,
            getFormattedCreateDate,
            setTitle,
            setDescription,
        }
    }
}

const TaskViewer = (task = {}) => {
    const {
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        resetCenterpieceElement,
        resetPropertiesElement,
    } = htmlMixin

    const container = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');
    const id = document.createElement('div');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');

    const getTitleInput = () => { return titleInput }
    const getDescriptionInput = () => { return descriptionInput }

    const buildTaskDetail = () => {
        id.textContent = 'Task ' + task.getTaskId().toString() + ':';
        titleInput.value  = task.getTitle();
        descriptionLabel.textContent = 'Description:';
        descriptionInput.value = task.getDescription();

        header.appendChild(id);
        header.appendChild(titleInput);

        body.appendChild(descriptionLabel);
        body.appendChild(descriptionInput);

        container.appendChild(header);
        container.appendChild(body);

        return container
    }

    const buildTaskProperties = () => {
        const saveButton = document.createElement('button');
        saveButton.textContent = 'Save';

        saveButton.addEventListener('click', saveTask);
        return saveButton
    }

    const saveTask = () => {
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
    }

    const displayTaskProperties = () => {
        getPropertiesElement().appendChild(buildTaskProperties());
    }

    const displayTaskDetail = () => {
        getCenterpieceElement().appendChild(buildTaskDetail())
    }

    const displayTaskView = () => {
        resetCenterpieceElement();
        resetPropertiesElement();
        displayTaskDetail();
        displayTaskProperties();
    }

    const displayTaskSign = () => {
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

        buildTaskSign(taskSign);
        buildTaskSignLabel(taskSign);
        appendTaskSign(taskSign);

        taskSign.addEventListener('click', displayTaskView);
    }

    return { displayTaskSign }
}

const activeNavigationPane = (panel = {}) => {


    return {}
}

const taskPanel = () => {
    return {}
}

// const ContentAssembler = () => {
//     const activeNavigation = htmlMixin.selectElement('#active-navigation')
//     activeNavigation.textContent = "text"
//
//     return { }
// }

const htmlMixin = (() => {
    const activeNavigationElement = document.querySelector('#active-navigation');
    const centerpieceElement = document.querySelector('#centerpiece');
    const propertiesElement = document.querySelector('#properties');

    const getActiveNavigationElement = () => { return activeNavigationElement }
    const getCenterpieceElement = () => { return centerpieceElement }
    const getPropertiesElement = () => { return propertiesElement }

    const resetCenterpieceElement = () => {
        if (getCenterpieceElement().firstElementChild) {
            getCenterpieceElement().removeChild(getCenterpieceElement().firstElementChild)
        }
    }

    const resetPropertiesElement = () => {
        if (getPropertiesElement().firstElementChild) {
            getPropertiesElement().removeChild(getPropertiesElement().firstElementChild)
        }
    }

    return {
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        resetCenterpieceElement,
        resetPropertiesElement,
    }
})();

const main = (() => {
    const Task = TaskCreator()
    jsonTasks.forEach((item) => {
        const task = Task(item);
        const taskView = TaskViewer(task)
        taskView.displayTaskSign();
    })

    return { }
})();