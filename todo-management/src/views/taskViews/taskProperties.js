import { htmlMixin } from "../../htmlMixin";

const TaskProperties = (projectManager = {},
                        projectObject = {},
                        taskManager = {},
                        taskObject = {}) => {
    const {
        getPropertiesElement,
        getCenterpieceElement,
        getTaskPassiveNavigationElement,
        buildButtonElement,
        getProjectSelectElement,
    } = htmlMixin

    const getTitleInput = () => { return document.querySelector('#task-title') };
    const getDescriptionInput = () => { return document.querySelector('#task-description') };
    const getDueDateInput = () => { return document.querySelector('#task-due-date') };
    const getIsCompleted = () => { return document.querySelector('#task-is-completed') };

    const buildSaveButton = () => { return buildButtonElement('Save Task', _saveButtonListener) }
    const buildDeleteButton = () => { return buildButtonElement('Delete Task', _deleteButtonListener) }

    const _saveButtonListener = () => { return _saveTask(taskObject) }
    const _deleteButtonListener = () => { return _deleteTask(projectObject, taskObject) }

    const _saveTask = (task) => {
        task.getTaskId() === void 0 ? task.setTaskId(taskManager.generateTaskId()) : task.getTaskId()
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
        task.setDueDate(getDueDateInput().value);
        task.setIsCompleted(getIsCompleted().checked);
        const id = +getProjectSelectElement().selectedOptions[0].value
        if (task.getProjectForeignKey() === void 0) {
            task.setProjectForeignKey(id)
            projectManager.getProject(id)
                .collectProjectTask(task);
        } else if (task.getProjectForeignKey() === id) {

        } else {
            task.setProjectForeignKey(id);
            projectObject.deleteProjectTask(task);
            projectManager.getProject(id).collectProjectTask(task);
        }
    }

    const _deleteTask = (project, task) => {
        // console.log('delete');
        project.deleteProjectTask(task);
        // project.getTasks().forEach(task => console.log(task.getTitle()))
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

export { TaskProperties }