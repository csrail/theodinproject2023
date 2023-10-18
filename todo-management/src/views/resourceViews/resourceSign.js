import { htmlMixin } from "../../htmlMixin";
import { Resource } from "../../resourceModel";
import { ProjectContent } from "../projectViews/projectContent";
import { ApplicationViewer } from "../viewEngine";
import { TaskContent } from "../taskViews/taskContent";
import {ProjectProperties} from "../projectViews/projectProperties";
import {TaskProperties} from "../taskViews/taskProperties";
import { ProjectCreator } from "../../projectModel";

const ResourceSign = (projectManager) => {
    const Project = ProjectCreator()

    const {
        getCenterpieceElement,
        getNewProjectButtonElement,
        getNewTaskButtonElement,
    } = htmlMixin

    const displayView = () => {
        getNewProjectButtonElement().addEventListener('click', () => {
            getCenterpieceElement().replaceChildren();
            ApplicationViewer(ProjectContent({}), ProjectProperties(projectManager, Project())).displayViews();
        })

        getNewTaskButtonElement().addEventListener('click', () => {
            getCenterpieceElement().replaceChildren();
            ApplicationViewer(TaskContent({}), TaskProperties({}, {})).displayViews();
        })
    }




    return {
        displayView,
    }
}

export {
    ResourceSign
}