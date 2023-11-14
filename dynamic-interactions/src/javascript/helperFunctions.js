const helperFunctions = (() => {
    function addClassesToElement(element, classes) {
        classes.forEach((cls) => {
            element.classList.add(cls);
        });
    }

    return {
        addClassesToElement,
    };
})();

export default helperFunctions;
