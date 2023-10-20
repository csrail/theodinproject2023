const TaskManager = (taskCollection) => {
    const Task = TaskCreator()
    const tasks= []
    let taskId = 6

    const generateTaskId = () => {
        return taskId++
    }

    const getTasks = () => { return tasks }

    const initialiseTasks = ((collection) => {
        collection.forEach((item) => {
            tasks.push(Task(item));
        })

        return {}
    })(taskCollection);

    const collectTask = (task) => {
        tasks.push(task);
    }

    const createTask = (object) => {
        tasks.push(Task(object))
    }

    return {
        getTasks,
        createTask,
        generateTaskId,
        collectTask,
    }
}

const TaskCreator = () => {
    let taskCount = 1;

    return (task = {}) => {
        const taskId = taskCount
        taskCount++

        const _createDate = new Date();
        let _taskId = task['id'];
        let _projectForeignKey = task['projectId']
        let _title = task['title'];
        let _description = task['description'];
        let _dueDate = task['dueDate'];
        let _isCompleted = task['isCompleted']

        const _getCreateDate = () => { return _createDate }

        const getTaskId = () => { return _taskId }
        const getProjectForeignKey = () => { return _projectForeignKey }
        const setProjectForeignKey = (key) => { return _projectForeignKey = key }
        const getTitle = () => { return _title }
        const getDescription = () => { return _description }
        const getFormattedCreateDate = () => { return _formatDate(_getCreateDate())}
        const getDueDate = () => { return _dueDate }
        const getIsCompleted = () => { return _isCompleted }

        const setTaskId = (id) => { return _taskId = id }
        const setTitle = (title) => { return _title = title }
        const setDescription = (description) => { return _description = description }
        const setDueDate = (date) => { return _dueDate = date }
        const setIsCompleted = (boolean) => { return _isCompleted = boolean }

        const _formatDate = (date) => { return date.toDateString() }

        return {
            getTaskId,
            getProjectForeignKey,
            setProjectForeignKey,
            getTitle,
            get id() { return _taskId },
            get projectId() { return _projectForeignKey },
            get title() { return _title },
            get description() { return _description },
            get dueDate() { return _dueDate },
            get isCompleted() { return _isCompleted },
            getDescription,
            getFormattedCreateDate,
            getDueDate,
            getIsCompleted,
            setTaskId,
            setTitle,
            setDescription,
            setDueDate,
            setIsCompleted,
        }
    }
}

export {
    TaskManager,
    TaskCreator,
}