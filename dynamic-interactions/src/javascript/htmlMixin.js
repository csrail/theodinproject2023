const htmlMixin = (() => {
    const createButtonElement = (text) => {
        const element = document.createElement("button");
        element.textContent = text;

        return element;
    };

    const createUnorderedListElement = (...classes) => {
        const element = document.createElement("ul");
        classes.forEach((cls) => {
            element.classList.add(cls);
        });

        return element;
    };

    const createListElement = (...classes) => {
        const element = document.createElement("li");
        classes.forEach((cls) => {
            element.classList.add(cls);
        });

        return element;
    };

    const createAnchorElement = (url, text) => {
        const element = document.createElement("a");
        element.setAttribute("href", `#${url}`);
        element.textContent = text;
        return element;
    };

    const createAnchorListCollection = (obj) => {
        const component = document.createDocumentFragment();

        Object.entries(obj).forEach((item) => {
            const anchorElement = createAnchorElement(item[0], item[1]);
            const listElement = createListElement();

            listElement.appendChild(anchorElement);
            component.appendChild(listElement);
        });

        return component;
    };

    const createListingComponent = (obj) => {
        const component = createUnorderedListElement(
            "user-menu-content",
            // "hidden",
        );

        component.appendChild(createAnchorListCollection(obj));

        return component;
    };

    return {
        createButtonElement,
        createListingComponent,
    };
})();

export default htmlMixin;
