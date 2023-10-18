import { htmlMixin } from "../../htmlMixin";

const TaskProperties = (projectManager = {},
                        projectObject = {},
                        taskObject = {}) => {
    const {
        getPropertiesElement,
        getCenterpieceElement,
        getTaskPassiveNavigationElement,
        buildButtonElement,
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
        task.setTitle(getTitleInput().value);
        task.setDescription(getDescriptionInput().value);
        task.setDueDate(getDueDateInput().value);
        task.setIsCompleted(getIsCompleted().checked);
        if (task.getProjectForeignKey() === void 0) {
            task.setProjectForeignKey(1)
            projectManager.getProjects()[0].collectProjectTask(task);
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