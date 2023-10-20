"use strict"

import { loadLocalStorage } from "./jsonFiles/jsonHandler";
import { ProjectManager } from "./projectModel";
import { TaskManager } from "./taskModel";
import { Navigation } from "./views/navigation";
import {ApplicationViewer} from "./views/viewEngine";
import {ResourceSign} from "./views/resourceViews/resourceSign";

const main = (() => {
    loadLocalStorage();

    const parsedLocalTasks = JSON.parse(localStorage.getItem('jsonTasks'));
    const parsedLocalProjects = JSON.parse(localStorage.getItem('jsonProjects'));

    const taskManager = TaskManager(
        parsedLocalTasks
    );

    const projectManager = ProjectManager(
        parsedLocalProjects,
        taskManager.getTasks()
    );

    // taskManager.createTask({
    //     id: 3,
    //     projectId: 1,
    //     title: "Precalculus and Trigonometry",
    //     description: "Beyond Algebra II, this course prepares you to understand the relationship between triangles and objects that exist in different time-space",
    // });
    //
    // // const task1 = taskManager.getTasks().find((task) => { return task.getTaskId() === 3 })
    // // projectManager.includeTaskInProject(task1);
    const navigation =  Navigation(projectManager, taskManager)
    navigation.initialiseDefaultView();
    navigation.initialiseHomeNavigation();

    // const project = resource.newProject({ id: 4, title: "Practical Object-Oriented Design in Ruby", description: "The best book describing object-oriented programming principles and nuances."});
    // resource.saveProject(project);

    // ResourceProperties(resource).displayView();
    ApplicationViewer(ResourceSign(projectManager, taskManager)).displayViews();

    return { }
})();