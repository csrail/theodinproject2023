import { htmlMixin } from "../../htmlMixin";
import { ApplicationViewer } from "../viewEngine";
import { TaskContent } from "./taskContent";
import { TaskProperties } from "./taskProperties";

const TaskSign = (projectManager = {},
                  project = {},
                  task = {}, ) => {
    const {
        getActiveNavigationElement,
        getPassiveNavigationElement,
        getTaskPassiveNavigationElement,
    } = htmlMixin

    const displayView = () => {
        let taskSign = document.createElement('div');

        const buildTaskSign = (sign) => {
            sign.id = ('task-sign-' + task.getTaskId().toString());
            sign.classList.add('task-sign');
        }
        const buildTaskSignLabel = (sign) => {
            sign.textContent = 'Task ' + task.getTaskId().toString() + ': ' + task.getTitle();
        }
        const appendTaskSign = (sign) => {
            getActiveNavigationElement().appendChild(sign);
        }

        const displayTask = () => {
            getPassiveNavigationElement().appendChild(getTaskPassiveNavigationElement())
            const taskView = ApplicationViewer(TaskContent(projectManager, task), TaskProperties(project, task));
            taskView.displayViews();
        }

        buildTaskSign(taskSign);
        buildTaskSignLabel(taskSign);
        appendTaskSign(taskSign);

        taskSign.addEventListener('click', displayTask);
        return getActiveNavigationElement().appendChild(taskSign);
    }

    return { displayView }
}

export { TaskSign }