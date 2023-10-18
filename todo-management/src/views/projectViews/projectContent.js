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

        if (project.getProjectId() === void 0) {
            titleLabel.textContent = "New Project"
        } else {
            titleLabel.textContent = "Project " + project.getProjectId().toString()
        }

        if (project.getProjectTitle() === void 0) {
            titleInput.value = ""
        } else {
            titleInput.value = project.getProjectTitle();
        }

        descriptionLabel.textContent = "Description";

        if (project.getProjectDescription() === void 0) {
            descriptionInput.value = ""
        } else {
            descriptionInput.value = project.getProjectDescription();
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
