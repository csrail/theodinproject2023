import { htmlMixin } from "../../htmlMixin";

const ProjectContent = (project) => {
    const {
        getCenterpieceElement,
    } = htmlMixin

    const container = document.createElement('div');
    const header = document.createElement('div');
    const body = document.createElement('div');
    const titleLabel = document.createElement('label');
    const titleInput = document.createElement('input');
    const descriptionLabel = document.createElement('label');
    const descriptionInput = document.createElement('input');

    const displayView = () => {
        _buildProjectContent(project);
        _showProjectContent();
    }

    const _buildProjectContent = (project) => {
        titleInput.id = 'project-title';
        descriptionInput.id = 'project-description';

        try {
            titleLabel.textContent = "Project " + project.getProjectId().toString()
        } catch (TypeError) {
            titleLabel.textContent = "New Project"
        }

        try {
            titleInput.value = project.getProjectTitle();
        } catch (TypeError) {
            titleInput.value
        }

        descriptionLabel.textContent = "Description";

        try {
            descriptionInput.value = project.getProjectDescription();
        } catch (TypeError) {
            descriptionInput.value
        }
    }

    const _showProjectContent = () => {
        header.appendChild(titleLabel);
        header.appendChild(titleInput);
        body.appendChild(descriptionLabel);
        body.appendChild(descriptionInput);

        container.appendChild(header);
        container.appendChild(body);

        return getCenterpieceElement().replaceChildren(container);
    }

    return { displayView }
}

export { ProjectContent }
