"use strict"

import jsonTasks from './jsonFiles/tasks.json';
import jsonProjects from './jsonFiles/projects.json';
import { ProjectManager } from "./projectModel";
import { TaskManager } from "./taskModel";
import { Navigation } from "./views/navigation";

const ProjectSigns = () => {

    return {}
}

const ProjectProperties = () => {

    return {}
}

const main = (() => {
    const taskManager = TaskManager(jsonTasks);
    const projectManager = ProjectManager(jsonProjects, taskManager.getTasks());
    taskManager.createTask({
        id: 3,
        projectId: 1,
        title: "Precalculus and Trigonometry",
        description: "Beyond Algebra II, this course prepares you to understand the relationship between triangles and objects that exist in different timespaces",
    });

    const task1 = taskManager.getTasks().find((task) => { return task.getTaskId() === 3 })
    projectManager.includeTaskInProject(task1);
    const navigation =  Navigation(projectManager.getProjects())
    navigation.initialiseDefaultView();
    navigation.initialiseHomeNavigation();

    return { }
})();