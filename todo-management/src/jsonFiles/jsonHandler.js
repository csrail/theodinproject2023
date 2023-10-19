import jsonProjects from './projects.json'
import jsonTasks from "./tasks.json";

function loadLocalStorage () {
    if (!localStorage.getItem('jsonProjects')) {
        localStorage.setItem('jsonProjects', JSON.stringify(jsonProjects));
    }

    if (!localStorage.getItem('jsonTasks')) {
        localStorage.setItem('jsonTasks', JSON.stringify(jsonTasks));
    }
}

export {
    loadLocalStorage,
}