import { htmlMixin } from "../../htmlMixin";
import { ApplicationViewer } from "../viewEngine";
import { ProjectContent } from "./projectContent";
import { ProjectProperties } from "./projectProperties";
import { TaskSign } from "../taskViews/taskSign";

const ProjectSign = (projectManager, project) => {
    const {
        getActiveNavigationElement,
        getPassiveNavigationElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const displayView = () => {
        return _buildProjectSign(projectManager, project)
    }

    const _buildProjectSign = (projectManager, project) => {
        const sign = document.createElement('div');
        sign.textContent = project.getProjectTitle()
        sign.addEventListener('click', () => {
            _showProjectTaskSigns(project);
            _showProjectPassiveNavigation(project);
            ApplicationViewer(ProjectContent(project), ProjectProperties(projectManager, project)).displayViews();
        })

        return getActiveNavigationElement().appendChild(sign)
    }

    const _showProjectTaskSigns = (project) => {
        getActiveNavigationElement().replaceChildren();
        project.getTasks()
            .forEach((task) => {
                const taskViewer = ApplicationViewer(TaskSign(project, task))
                taskViewer.displayViews();
        })
   }

    const _showProjectPassiveNavigation = (project) => {
        getProjectPassiveNavigationElement().addEventListener('click', () => {
            getTaskPassiveNavigationElement().remove()
            ApplicationViewer(ProjectContent(project)).displayViews();
        })

        return getPassiveNavigationElement().appendChild(getProjectPassiveNavigationElement());
    }

    return { displayView }
}

export { ProjectSign }