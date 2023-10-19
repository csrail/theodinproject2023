import { htmlMixin } from "../../htmlMixin";
import { Resource } from "../../resourceModel";
import { ProjectContent } from "../projectViews/projectContent";
import { ApplicationViewer } from "../viewEngine";
import { TaskContent } from "../taskViews/taskContent";
import {ProjectProperties} from "../projectViews/projectProperties";
import {TaskProperties} from "../taskViews/taskProperties";
import { ProjectCreator } from "../../projectModel";
import { TaskCreator } from "../../taskModel";

const ResourceSign = (projectManager, taskManager) => {
    const Project = ProjectCreator();
    const Task = TaskCreator();

    const {
        getCenterpieceElement,
        getNewProjectButtonElement,
        getNewTaskButtonElement,
    } = htmlMixin

    const displayView = () => {
        getNewProjectButtonElement().addEventListener('click', () => {
            getCenterpieceElement().replaceChildren();
            ApplicationViewer(ProjectContent(Project()), ProjectProperties(projectManager, Project())).displayViews();
        })

        getNewTaskButtonElement().addEventListener('click', () => {
            getCenterpieceElement().replaceChildren();
            ApplicationViewer(TaskContent(projectManager, Task()), TaskProperties(projectManager, {}, taskManager, Task())).displayViews();
        })
    }

    return {
        displayView,
    }
}

export {
    ResourceSign
}