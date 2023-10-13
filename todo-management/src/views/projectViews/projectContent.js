import { htmlMixin } from "../../htmlMixin";

const ProjectContent = (project) => {
    const {
        getCenterpieceElement,
    } = htmlMixin

    const displayView = () => {
        _showProjectContent(project)
    }

    const _showProjectContent = (project) => {
        const content = document.createElement('div');
        content.textContent = project.getProjectDescription()

        return getCenterpieceElement().replaceChildren(content)
    }

    return {
        displayView
    }
}

export { ProjectContent }
