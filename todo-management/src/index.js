"use strict"

import jsonTasks from './jsonFiles/tasks.json';
import jsonProjects from './jsonFiles/projects.json';
import { ProjectManager } from "./projectModel";
import { TaskManager } from "./taskModel";
import { Navigation } from "./views/navigation";
import { Resource } from "./resourceModel"

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
    const navigation =  Navigation(projectManager)
    navigation.initialiseDefaultView(projectManager);
    navigation.initialiseHomeNavigation();

    const resource = Resource(projectManager)
    const project = resource.newProject({ id: 4, title: "Practical Object-Oriented Design in Ruby", description: "The best book describing object-oriented programming principles and nuances."});
    resource.saveProject(project);
    debugger

    return { }
})();