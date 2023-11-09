const ProjectManager = (projectCollection, taskCollection) => {
    const Project = ProjectCreator()
    const projects = []
    let tasks = taskCollection
    let projectId = 3

    const generateProjectId = () => {
        return projectId++
    }

    const getProject = (id) => {
        return projects.find((project) => project.getProjectId() === id)
    }

    const _initialiseProjects = ((baseProjects) => {
        baseProjects.forEach((project) => {
            projects.push(Project(project))
        })

        return {}
    })(projectCollection)

    const _initialiseProjectTasks = ((baseProjects, baseTasks) => {
        baseProjects.forEach((project) => {
            baseTasks.forEach((task) => {
                if (task.getProjectForeignKey() === project.getProjectId()) {
                    project.collectProjectTask(task)
                }
            })
        })

        return {}
    })(projects, tasks)

    const includeTaskInProject = (task) => {
        const project = projects.find((project) => {
            return project.getProjectId() === task.getProjectForeignKey()
        })
        project.collectProjectTask(task)
    }

    const collectProject = (project) => {
        projects.push(project)
        // localStorage.setItem('jsonProjects', JSON.stringify(projects));
    }

    const deleteProject = (project) => {
        const index = projects.indexOf(project)
        return projects.splice(index, 1)
    }

    const getProjects = () => {
        return projects
    }

    return {
        getProjects,
        collectProject,
        deleteProject,
        includeTaskInProject,
        generateProjectId,
        getProject,
    }
}

const ProjectCreator = () => {
    return (project = {}) => {
        let projectId = project['projectId']
        let projectTitle = project['projectTitle']
        let projectDescription = project['projectDescription']
        const taskCollection = []

        const getProjectId = () => {
            return projectId
        }
        const getProjectTitle = () => {
            return projectTitle
        }
        const getProjectDescription = () => {
            return projectDescription
        }
        const getTasks = () => {
            return taskCollection
        }

        const setProjectTitle = (title) => {
            return (projectTitle = title)
        }

        const setProjectDescription = (description) => {
            return (projectDescription = description)
        }

        const collectProjectTask = (task) => {
            return taskCollection.push(task)
        }

        const deleteProjectTask = (task) => {
            const index = taskCollection.indexOf(task)
            return taskCollection.splice(index, 1)
        }

        const setProjectId = (id) => {
            projectId = id
        }

        return {
            getProjectId,
            getProjectTitle,
            getProjectDescription,
            getTasks,
            setProjectTitle,
            setProjectDescription,
            collectProjectTask,
            deleteProjectTask,
            get projectId() {
                return projectId
            },
            get projectTitle() {
                return projectTitle
            },
            get projectDescription() {
                return projectDescription
            },
            setProjectId,
        }
    }
}

export { ProjectManager, ProjectCreator }
