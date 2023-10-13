import { htmlMixin } from "../../htmlMixin";
import { ApplicationViewer } from "../viewEngine";
import { TaskSign } from "../taskViews/taskSign";

const ProjectSign = (project) => {
    const {
        getActiveNavigationElement,
        getPassiveNavigationElement,
        getCenterpieceElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const displayView = () => {
        return _buildProjectSign(project)
    }

    const _buildProjectSign = (project) => {
        const sign = document.createElement('div');
        sign.textContent = project.getProjectTitle()
        sign.addEventListener('click', () => {
            _showProjectTaskSigns(project);
            _showProjectPassiveNavigation(project);
            _showProjectContent(project);
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
            _showProjectContent(project)
        })

        return getPassiveNavigationElement().appendChild(getProjectPassiveNavigationElement());
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

export { ProjectSign }