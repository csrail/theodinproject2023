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
    const assignedProjectOption = document.createElement('option');

    const getProject = () => {
        return projectManager.getProjects().find((project) => project.getProjectId() === task.getProjectForeignKey())
    }

    titleInput.id = 'task-title';
    descriptionInput.id ='task-description';
    dueDateInput.id = 'task-due-date';
    isCompletedInput.id = 'task-is-completed';
    projectListing.id = 'project-select';

    const _buildTaskIdLabel = () => {
        if (task.getTaskId() === void 0) {
            return idLabel.textContent = "New Task"
        } else {
            return idLabel.textContent = 'Task ' + task.getTaskId().toString() + ':';
        }
    }

    const _buildTaskTitleValue = () => {
        if (task.getTitle() === void(0)) {
            return titleInput.value = ""
        } else {
            return titleInput.value  = task.getTitle();
        }
    }

    const _buildTaskDescriptionLabel = () => {
        return descriptionLabel.textContent = 'Description:';
    }

    const _buildDescriptionValue = () => {
        if (task.getDescription() === void(0)) {
            return descriptionInput.value = ""
        } else {
            return descriptionInput.value = task.getDescription();
        }
    }

    const _buildDueDateFields = () => {
        dueDateLabel.textContent = 'Due Date:';
        dueDateInput.setAttribute('type', 'date');

        try {
            dueDateInput.value = task.getDueDate();
        } catch (TypeError) {
            dueDateInput.value
        }
    }

    const _buildIsCompletedFields = () => {
        isCompletedLabel.textContent = 'Completed?';
        isCompletedInput.setAttribute('type', 'checkbox');

        try {
            isCompletedInput.checked = task.getIsCompleted();
        } catch (TypeError) {
            isCompletedInput.checked = false
        }
    }

    const _buildAssignedProjectOption = () => {
        assignedProjectOption.value = ""
        if (getProject() === void 0) {
            assignedProjectOption.textContent = ""
        } else {
            assignedProjectOption.textContent = getProject().getProjectTitle();
        }
        return assignedProjectOption
    }

    const _buildSelection = () => {
        projectListing.appendChild(_buildAssignedProjectOption());

        projectManager.getProjects()
            .forEach((project) => {
                if (getProject() === void 0) {
                    const option = document.createElement('option')
                    option.value = project.getProjectId();
                    option.textContent = project.getProjectTitle();
                    projectListing.appendChild(option)
                } else {
                    if (project.getProjectId() === getProject().getProjectId()) return
                    const option = document.createElement('option')
                    option.value = project.getProjectId();
                    option.textContent = project.getProjectTitle();
                    projectListing.appendChild(option)
                }

            })
    }

    const _buildFields = () => {
        _buildTaskIdLabel();
        _buildTaskTitleValue();
        _buildTaskDescriptionLabel();
        _buildDescriptionValue();
        _buildDueDateFields();
        _buildIsCompletedFields();
        _buildSelection();
    }

    const _buildPresentation = () => {
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

    const _buildTaskContent = () => {
        _buildFields();


        return _buildPresentation();
    }

    return { displayView }
}

export { TaskContent }