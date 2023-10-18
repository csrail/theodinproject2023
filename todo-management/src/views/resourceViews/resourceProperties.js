import { htmlMixin } from "../../htmlMixin";
import { ApplicationViewer } from "../viewEngine";
import { Resource } from "../../resourceModel";
import { ProjectContent } from "../projectViews/projectContent";
import { ProjectProperties } from "../projectViews/projectProperties";

const ResourceProperties = () => {
    const {
        getPropertiesElement,
        buildButtonElement,
    } = htmlMixin

    const startNewProject = () => {

    }

    const displayView = () => {
        const button = document.getElementById('new-project-button')
        button.addEventListener('click', () => {
            ApplicationViewer(ProjectProperties({}, {})).displayViews();
        })

        return button
    }

    return {
        displayView
    }
}

export {
    ResourceProperties,
}