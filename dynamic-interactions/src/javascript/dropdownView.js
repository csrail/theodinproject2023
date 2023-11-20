import htmlMixin from "./htmlMixin";

export default class DropdownView {
    #dropdownObject;

    constructor(dropdownObject) {
        this.#dropdownObject = dropdownObject;
    }

    displayView() {
        return this.buildDropdownComponent();
    }

    buildDropdownComponent() {
        const component = htmlMixin.createNavElement();

        component.appendChild(
            DropdownView.#buildDropdownButton(
                this.#dropdownObject.dropdownTitle,
                this.#dropdownObject.buttonClasses,
            ),
        );

        component.appendChild(
            DropdownView.#buildDropdownListing(
                this.#dropdownObject.dropdownListing,
                this.#dropdownObject.ulClasses,
            ),
        );

        return component;
    }

    static #buildDropdownButton(title, classes) {
        const component = htmlMixin.createButtonElement(title, classes);

        component.addEventListener("click", this.#toggleVisibilityListener);
        // component.addEventListener("click", this.#hideDropdown);
        // within static scope, 'this' refers to the class,
        // prefer calling 'this' than the class DropdownView since
        // the latter approach could be a reference to a different class being injected
        // note: 'this' is only able to access class level declarations not
        // instance level declarations, i.e. this.#dropdownObject isn't accessible.
        window.addEventListener("click", (event) => {
            if (!(event.target === component)) {
                component.nextElementSibling.classList.remove("visible");
            }
        });

        return component;
    }

    static #toggleVisibilityListener(e) {
        e.target.nextElementSibling.classList.toggle("visible");
    }

    static #hideDropdown(e) {
        window.addEventListener("click", (event) => {
            if (!event.target.classList.contains("dropdown-button")) {
                e.target.nextElementSibling.classList.remove("visible");
            }
        });
    }

    static #buildDropdownListing(listing, ulClasses) {
        return htmlMixin.createListingComponent(listing, ulClasses);
    }
}
