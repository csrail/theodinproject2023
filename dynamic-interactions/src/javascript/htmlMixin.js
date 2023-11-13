const htmlMixin = (() => {
    const createButtonElement = (text) => {
        const element = document.createElement("button");
        element.textContent = text;

        return element;
    };

    return {
        createButtonElement,
    };
})();

export default htmlMixin;
