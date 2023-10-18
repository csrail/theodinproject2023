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

    const collectProject = (project) => {
        projects.push(project);
    }

    const deleteProject = (project) => {
        const index = projects.indexOf(project);
        return projects.splice(index, 1);
    }

    const getProjects = () => { return projects }

    return {
        getProjects,
        collectProject,
        deleteProject,
        includeTaskInProject,
    }
}


const ProjectCreator = () => {
    return (project = {})=> {
        let projectId = project['id'];
        let projectTitle = project['title'];
        let projectDescription = project['description'];
        const taskCollection = [];

        const getProjectId = () => { return projectId }
        const getProjectTitle = () => { return projectTitle }
        const getProjectDescription = () => { return projectDescription }
        const getTasks = () => { return taskCollection }

        const setProjectTitle = (title) => { return projectTitle = title}

        const setProjectDescription = (description) => { return projectDescription = description }

        const collectProjectTask = (task) => { return taskCollection.push(task) }

        const deleteProjectTask = (task) => {
            const index = taskCollection.indexOf(task)
            return taskCollection.splice(index, 1);
        }

        const generateProjectId = () => {
            projectId = 4;
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
            get projectId() { return projectId },
            get projectTitle() { return projectTitle },
            get projectDescription() { return projectDescription },
            generateProjectId,
        }
    }
}

export {
    ProjectManager,
    ProjectCreator,
}