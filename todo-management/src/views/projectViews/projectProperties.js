import {htmlMixin} from "../../htmlMixin";
import {ApplicationViewer} from "../viewEngine";
import { TaskSign } from "../taskViews/taskSign";
import { ProjectContent } from "./projectContent";

const ProjectProperties = (projectManager, project) => {
    const {
        getCenterpieceElement,
        getPropertiesElement,
        buildButtonElement,
    } = htmlMixin

    const _getTitleInput = () => { return document.getElementById('project-title') }
    const _getDescriptionInput = () => { return document.getElementById('project-description') }

    const displayView = () => {
        getPropertiesElement().replaceChildren()
        getPropertiesElement().appendChild(_buildProjectSaveButton(project))
        if (project.getProjectId() === void(0)) {
            getPropertiesElement().appendChild(_buildProjectCancelButton())
        } else {
            getPropertiesElement().appendChild(_buildProjectDeleteButton(projectManager, project))
        }
    }

    const _buildProjectSaveButton = (project) => {

        const _saveProject = (project) => {
            project.setProjectTitle(_getTitleInput().value);
            project.setProjectDescription(_getDescriptionInput().value);
            if (project.getProjectId() === void(0)) {
                project.setProjectId(projectManager.generateProjectId());
                projectManager.collectProject(project);
                ApplicationViewer(
                    // TaskSign(projectManager, project),
                    ProjectContent(project),
                    ProjectProperties(projectManager, project))
                    .displayViews()
            }
            // localStorage.setItem('jsonProjects', JSON.stringify(projectManager.getProjects()))
        }

        const _saveProjectListener = () => { return _saveProject(project) }

        return buildButtonElement('Save Project', _saveProjectListener)
    }

    const _buildProjectDeleteButton = (projectManager, project) => {

        const _deleteProjectListener = () => {
            projectManager.deleteProject(project);
            getCenterpieceElement().replaceChildren();
            getPropertiesElement().replaceChildren();
        }

        return buildButtonElement('Delete Project', _deleteProjectListener)
    }

    const _buildProjectCancelButton = () => {
        const _cancelProjectListener = () => {
            getCenterpieceElement().replaceChildren();
            getPropertiesElement().replaceChildren();
        }

        return buildButtonElement('Cancel Project', _cancelProjectListener);
    }

    return {
        displayView,
    }
}

export { ProjectProperties }