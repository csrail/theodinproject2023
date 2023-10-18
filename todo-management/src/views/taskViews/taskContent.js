import { htmlMixin } from "../../htmlMixin";

const TaskContent = (task = {}) => {
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

    titleInput.id = 'task-title';
    descriptionInput.id ='task-description';
    dueDateInput.id = 'task-due-date';
    isCompletedInput.id = 'task-is-completed';

    const _buildTaskContent = () => {

        try {
            idLabel.textContent = 'Task ' + task.getTaskId().toString() + ':';
        } catch (TypeError) {
            idLabel.textContent = 'New Task'
        }

        try {
            titleInput.value  = task.getTitle();
        } catch (TypeError) {
            titleInput.value
        }

        descriptionLabel.textContent = 'Description:';

        try {
            descriptionInput.value = task.getDescription();
        } catch (TypeError) {
            descriptionInput.value
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

        header.appendChild(idLabel);
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

    return { displayView }
}

export { TaskContent }