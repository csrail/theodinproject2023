import { htmlMixin } from "../../htmlMixin";
import { ApplicationViewer } from "../viewEngine";
import { TaskSign } from "../taskViews/taskSign";

const ProjectSign = (project) => {
    const {
        getActiveNavigationElement,
    } = htmlMixin
    const displayView = () => {
        return _buildProjectSign(project)
    }

    const _buildProjectSign = (project) => {
        const sign = document.createElement('div');
        sign.textContent = project.getProjectTitle()
        sign.addEventListener('click', () => {
            _showProjectTask(project)
        })

        return getActiveNavigationElement().appendChild(sign)
    }

    const _showProjectTask = (project) => {
        getActiveNavigationElement().replaceChildren();
        project.getTasks()
            .forEach((task) => {
                const taskViewer = ApplicationViewer(TaskSign(project, task))
                taskViewer.displayViews();
        })
    }

    return {
        displayView
    }
}

export { ProjectSign }