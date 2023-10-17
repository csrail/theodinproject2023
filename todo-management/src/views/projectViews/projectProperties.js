import {htmlMixin} from "../../htmlMixin";

const ProjectProperties = (projectManager, project) => {
    const {
        getPropertiesElement,
        buildButtonElement,
    } = htmlMixin

    const _getTitleInput = () => { return document.getElementById('project-title') }
    const _getDescriptionInput = () => { return document.getElementById('project-description') }

    const displayView = () => {
        getPropertiesElement().replaceChildren()
        getPropertiesElement().appendChild(_buildProjectSaveButton(project))
        getPropertiesElement().appendChild(_buildProjectDeleteButton(projectManager, project))
    }

    const _buildProjectSaveButton = (project) => {

        const _saveProject = (project) => {
            project.setProjectTitle(_getTitleInput().value);
            project.setProjectDescription(_getDescriptionInput().value);
        }

        const _saveProjectListener = () => { return _saveProject(project) }

        return buildButtonElement('Save Project', _saveProjectListener)
    }

    const _buildProjectDeleteButton = (projectManager, project) => {

        const _deleteProjectListener = () => {
            projectManager.deleteProject(project);
        }

        return buildButtonElement('Delete Project', _deleteProjectListener)
    }

    return { displayView }
}

export { ProjectProperties }