import { htmlMixin } from "../htmlMixin";
import { ApplicationViewer } from "./viewEngine";
import { TaskSign } from "./taskViews/taskSign";
import { ProjectSign } from "./projectViews/projectSign";

const Navigation = (projectManager) => {
    const {
        getPassiveNavigationElement,
        getHomePassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getResourcePanelElement,
        getNewProjectButtonElement,
        getNewTaskButtonElement,
    } = htmlMixin

    const initialiseDefaultView = (projectManager) => {
        getActiveNavigationElement().replaceChildren();
        _displayDefaultProjects(projectManager);
        getResourcePanelElement().appendChild(getNewProjectButtonElement());
        getResourcePanelElement().appendChild(getNewTaskButtonElement());
    }

    const _displayDefaultProjects = (projectManager) => {
        projectManager.getProjects().forEach((project) => {
            ApplicationViewer(ProjectSign(projectManager, project)).displayViews();
        })
    }

    const initialiseHomeNavigation = () => {
        getHomePassiveNavigationElement().addEventListener('click', _resetDashboard)
    }

    const _resetDashboard = () => {
        getPassiveNavigationElement().replaceChildren();
        getPassiveNavigationElement().appendChild(getHomePassiveNavigationElement());
        getActiveNavigationElement().replaceChildren();
        getCenterpieceElement().replaceChildren();
        getPropertiesElement().replaceChildren();
        initialiseDefaultView(projectManager);
    }

    return {
        initialiseDefaultView,
        initialiseHomeNavigation,
    }
}

export { Navigation }