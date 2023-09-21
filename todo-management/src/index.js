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
    let taskCount = 0

    return (obj = {}) => {
        taskCount++
        const getTaskCount = () => { return taskCount }

        const _createDate = new Date();
        let _title = obj['title'];
        let _description = obj['description'];

        const _getTitle = () => { return _title }
        const _getDescription = () => { return _description }
        const _setTitle = (title) => { return _title = title }
        const _setDescription = (description) => { return _description = description }
        const _getCreateDate = () => { return _createDate }
        const _formatDate = (date) => { return date.toDateString() }
        const getFormattedCreateDate = () => { return _formatDate(_getCreateDate())}

        const getTask = () => {
            return { title: _getTitle() }
        }

        return {
            getTask,
            getFormattedCreateDate,
            getTaskCount,
        }
    }
}

const TaskViewer = (task = {}) => {
    const {
        selectElement,
        getActiveNavigationElement,
    } = htmlMixin

    const displayTask = () => {
        const taskReference= document.createElement('div')
        taskReference.textContent = 'Task ' + task.getTaskCount().toString()
        getActiveNavigationElement().appendChild(taskReference);
    }

    return { displayTask }
}

// const ContentAssembler = () => {
//     const activeNavigation = htmlMixin.selectElement('#active-navigation')
//     activeNavigation.textContent = "text"
//
//     return { }
// }

const htmlMixin = (() => {
    const activeNavigationElement = document.querySelector('#active-navigation')
    const selectElement = (element) => { return document.querySelector(element)}
    const getActiveNavigationElement = () => {
        return activeNavigationElement
    }

    return {
        selectElement,
        getActiveNavigationElement,
    }
})();

const main = (() => {
    const Task = TaskCreator()
    jsonTasks.forEach((item) => {
        const task = Task(item);
        TaskViewer(task).displayTask();
    })

    return { }
})();