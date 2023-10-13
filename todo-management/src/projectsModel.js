const ProjectManager = (projectCollection, taskCollection) => {
    const Project = ProjectCreator()
    const projects = []
    let tasks = taskCollection

    const _initialiseProjects = ((baseProjects) => {
        baseProjects.forEach((project) => {
            projects.push(Project(project));
        })

        return {}
    })(projectCollection);

    const _initialiseProjectTasks = ((baseProjects, baseTasks) => {
        baseProjects.forEach((project) => {
            baseTasks.forEach((task) => {
                if (task.getProjectForeignKey() === project.getProjectId()) {
                    project.collectProjectTask(task);
                }
            })
        })

        return {}
    })(projects, tasks);

    const includeTaskInProject = (task) => {
        const project = projects.find((project) => { return project.getProjectId() === task.getProjectForeignKey() })
        project.collectProjectTask(task);
    }

    const getProjects = () => { return projects }

    return {
        getProjects,
        includeTaskInProject,
    }
}


const ProjectCreator = () => {
    return (project = {})=> {
        const projectId = project['id'];
        const projectTitle = project['title'];
        const projectDescription = project['description'];
        const taskCollection = [];

        const getProjectId = () => { return projectId }
        const getProjectTitle = () => { return projectTitle }
        const getProjectDescription = () => { return projectDescription }
        const getTasks = () => { return taskCollection }

        const collectProjectTask = (task) => { return taskCollection.push(task) }

        const deleteProjectTask = (task) => {
            const index = taskCollection.indexOf(task)
            return taskCollection.splice(index, 1);
        }

        return {
            getProjectId,
            getProjectTitle,
            getProjectDescription,
            getTasks,
            collectProjectTask,
            deleteProjectTask,
            get projectId() { return projectId },
            get projectTitle() { return projectTitle},
        }
    }
}

export { ProjectManager }