const htmlMixin = (() => {
    const homePassiveNavigationElement = document.querySelector('#home');
    const passiveNavigationElement = document.querySelector('#passive-navigation');
    const activeNavigationElement = document.querySelector('#active-navigation');
    const centerpieceElement = document.querySelector('#centerpiece');
    const propertiesElement = document.querySelector('#properties');
    const resourcePanelElement = document.getElementById('resource-panel');

    let projectPassiveNavigationElement
    let taskPassiveNavigationElement
    let newProjectButtonElement
    let newTaskButtonElement

    const _buildProjectButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'project';
        button.textContent = 'PROJECT';
        return projectPassiveNavigationElement = button
    }

    const _buildTaskButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'task';
        button.textContent = 'TASK';
        return taskPassiveNavigationElement = button
    }

    const _buildNewProjectButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'new-project-button';
        button.textContent = 'New Project';
        return newProjectButtonElement = button
    }

    const _buildNewTaskButtonElement = () => {
        const button = document.createElement('button');
        button.id = 'new-task-button';
        button.textContent = 'New Task';
        return newTaskButtonElement = button
    }

    const getProjectPassiveNavigationElement = () => {
        return projectPassiveNavigationElement === void(0) ? _buildProjectButtonElement() : projectPassiveNavigationElement
    }

    const getTaskPassiveNavigationElement = () => {
        return taskPassiveNavigationElement === void(0) ? _buildTaskButtonElement() : taskPassiveNavigationElement
    }

    const getNewProjectButtonElement = () => {
        return newProjectButtonElement === void(0) ? _buildNewProjectButtonElement() : document.getElementById('new-project-button')
    }

    const getNewTaskButtonElement = () => {
        return newTaskButtonElement === void(0) ? _buildNewTaskButtonElement() : document.getElementById('new-task-button')
    }

    const getPassiveNavigationElement = () => { return passiveNavigationElement }
    const getHomePassiveNavigationElement = () => { return homePassiveNavigationElement }
    const getActiveNavigationElement = () => { return activeNavigationElement } // keyword: Panel
    const getCenterpieceElement = () => { return centerpieceElement }
    const getPropertiesElement = () => { return propertiesElement }

    const buildButtonElement = (text, listener) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.addEventListener('click', listener);
        return button;
    }

    const getResourcePanelElement = () => { return resourcePanelElement }

    const getProjectSelectElement = () => { return document.getElementById('project-select')}

    return {
        getPassiveNavigationElement,
        getActiveNavigationElement,
        getCenterpieceElement,
        getPropertiesElement,
        getHomePassiveNavigationElement,
        getProjectPassiveNavigationElement,
        getTaskPassiveNavigationElement,
        getResourcePanelElement,
        buildButtonElement,
        getNewProjectButtonElement,
        getNewTaskButtonElement,
        getProjectSelectElement,
    }
})();

export { htmlMixin }