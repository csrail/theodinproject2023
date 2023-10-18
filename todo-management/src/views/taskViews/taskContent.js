import { htmlMixin } from "../../htmlMixin";
import {ProjectManager} from "../../projectModel";

const TaskContent = (projectManager = {}, task = {}) => {
    const {
        getCenterpieceElement,
    } = htmlMixin;

    const displayView = () => {
        getCenterpieceElement().replaceChildren();
        getCenterpieceElement().appendChild(_buildTaskContent());
    }

    const container = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');
    const idLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');
    const dueDateLabel = document.createElement('label');
    const dueDateInput = document.createElement('input');
    const isCompletedLabel = document.createElement('label');
    const isCompletedInput = document.createElement('input');
    const projectListing = document.createElement('select');

    titleInput.id = 'task-title';
    descriptionInput.id ='task-description';
    dueDateInput.id = 'task-due-date';
    isCompletedInput.id = 'task-is-completed';

    const _buildTaskContent = () => {

        if (task.getTaskId() === void 0) {
            idLabel.textContent = "New Task"
        } else {
            idLabel.textContent = 'Task ' + task.getTaskId().toString() + ':';
        }

        if (task.getTitle() === void(0)) {
            titleInput.value = ""
        } else {
            titleInput.value  = task.getTitle();
        }

        descriptionLabel.textContent = 'Description:';

        if (task.getDescription() === void(0)) {
            descriptionInput.value = ""
        } else {
            descriptionInput.value = task.getDescription();
        }

        dueDateLabel.textContent = 'Due Date:';
        dueDateInput.setAttribute('type', 'date');

        try {
            dueDateInput.value = task.getDueDate();
        } catch (TypeError) {
            dueDateInput.value
        }

        isCompletedLabel.textContent = 'Completed?';
        isCompletedInput.setAttribute('type', 'checkbox');

        try {
            isCompletedInput.checked = task.getIsCompleted();
        } catch (TypeError) {
            isCompletedInput.checked = false
        }


        projectManager.getProjects()
            .forEach((project) => {
                const option = document.createElement('option')
                option.value = project.getProjectId();
                option.textContent = project.getProjectTitle();
                projectListing.appendChild(option)
            })


        header.appendChild(idLabel);
        header.appendChild(titleInput);

        body.appendChild(descriptionLabel);
        body.appendChild(descriptionInput);

        body.appendChild(dueDateLabel);
        body.appendChild(dueDateInput);

        body.appendChild(isCompletedLabel);
        body.appendChild(isCompletedInput);

        body.appendChild(projectListing);

        container.appendChild(header);
        container.appendChild(body);

        return container
    }

    return { displayView }
}

export { TaskContent }