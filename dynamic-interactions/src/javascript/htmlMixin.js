import helperFunctions from "./helperFunctions";

const htmlMixin = (() => {
    const { addClassesToElement } = helperFunctions;

    function createNavElement(...classes) {
        const element = document.createElement("nav");
        addClassesToElement(element, classes);

        return element;
    }
    const createButtonElement = (text) => {
        const element = document.createElement("button");
        element.textContent = text;

        return element;
    };

    const createUnorderedListElement = (classes) => {
        const element = document.createElement("ul");
        addClassesToElement(element, classes);

        return element;
    };

    const createListElement = (classes) => {
        const element = document.createElement("li");
        addClassesToElement(element, classes);

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

    const createListingComponent = (listing, classes) => {
        const component = createUnorderedListElement(classes);
        // "dropdown-content",
        // "hidden",

        component.appendChild(createAnchorListCollection(listing));

        return component;
    };

    return {
        createNavElement,
        createButtonElement,
        createListingComponent,
    };
})();

export default htmlMixin;
