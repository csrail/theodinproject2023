// resource takes projectManager object
// .newProject invoked on resource
// resource creates new Project
// resource is saved into Project Manager
import { ProjectCreator } from './projectModel.js'

const Resource = (projectManager) => {
    const Project = ProjectCreator();

    const newProject = (project = {}) => { return Project(project) }

    const saveProject = (project) => { projectManager.collectProject(project) }

    return {
        newProject,
        saveProject,
    }
}

export {
    Resource
}