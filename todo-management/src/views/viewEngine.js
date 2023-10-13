const ApplicationViewer = (...Views) => {
    const displayViews = () => {
        Views.forEach((view) => {
            view.displayView();
        })
    }

    return { displayViews }
}

export { ApplicationViewer }