// resource takes projectManager object
// .newProject invoked on resource
// resource creates new Project
// resource is saved into Project Manager
import { ProjectCreator } from './projectModel.js'

const Resource = (projectManager) => {
    const Project = ProjectCreator();
    let project

    const newProject = () => { return project = Project() }

    const saveProject = () => { projectManager.collectProject(project) }

    return {
        newProject,
        saveProject,
    }
}

export {
    Resource
}