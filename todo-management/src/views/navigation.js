import { htmlMixin } from "../htmlMixin";
import { ApplicationViewer } from "./viewEngine";
import { TaskSign } from "./taskViews/taskSign";

const Navigation = (projectList) => {
    const {
        getPassiveNavigationElement,
        getHomePassiveNavigationElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getNewProjectButtonElement,
    } = htmlMixin

    const displayDefaultView = () => {
        getActiveNavigationElement().replaceChildren();
        _displayDefaultProjects(projectList);
        getActiveNavigationElement().appendChild(getNewProjectButtonElement());
    }

    const _displayDefaultProjects = (projects) => {
        projects.forEach((project) => {
            getActiveNavigationElement().appendChild(_buildProjectSign(project));
        })
    }

    const initialiseHomeNavigation = () => {
        getHomePassiveNavigationElement().addEventListener('click', resetDashboard)
    }

    const resetDashboard = () => {
        getPassiveNavigationElement().replaceChildren();
        getPassiveNavigationElement().appendChild(getHomePassiveNavigationElement());
        getActiveNavigationElement().replaceChildren();
        getCenterpieceElement().replaceChildren();
        getPropertiesElement().replaceChildren();
        displayDefaultView(projectList);
    }

    const _buildProjectContent = (project) => {
        const content = document.createElement('div');
        content.textContent = project.getProjectDescription()
        return content
    }

    const _buildProjectSign = (project) => {
        const sign = document.createElement('div');
        sign.textContent = project.getProjectTitle()
        sign.addEventListener('click', () => {
            _updatePassiveNavigation(project);
            _updateActiveNavigation(project);
            _displayProjectContent(project);
        })

        return sign
    }

    const _displayProjectContent = (project) => {
        getCenterpieceElement().replaceChildren(_buildProjectContent(project));
    }

    const _updatePassiveNavigation = (project) => {
        getPassiveNavigationElement().appendChild(getProjectPassiveNavigationElement());
        getProjectPassiveNavigationElement().addEventListener('click', () => {
            getTaskPassiveNavigationElement().remove();
            getCenterpieceElement().replaceChildren(_buildProjectContent(project));
            getPropertiesElement().replaceChildren();
        })
    }
    const _updateActiveNavigation = (project) => {
        getActiveNavigationElement().replaceChildren();
        project.getTasks()
            .forEach((task) => {
                const taskViewer = ApplicationViewer(TaskSign(project, task))
                taskViewer.displayViews();
            })

    }

    return {
        displayDefaultView,
        initialiseHomeNavigation,
    }
}

export { Navigation }