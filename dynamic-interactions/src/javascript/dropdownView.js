import htmlMixin from "./htmlMixin";

export default class DropdownView {
    #dropdownObject;

    constructor(dropdownObject) {
        this.#dropdownObject = dropdownObject;
    }

    displayView() {
        return document
            .querySelector("body")
            .appendChild(this.buildDropdownComponent());
    }

    buildDropdownComponent() {
        const component = htmlMixin.createNavElement();

        component.appendChild(
            DropdownView.#buildDropdownButton(
                this.#dropdownObject.dropdownTitle,
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

    static #buildDropdownButton(title) {
        const component = htmlMixin.createButtonElement(title);

        component.addEventListener("click", this.#toggleVisibilityListener);
        // within static scope, this refers to the class

        return component;
    }

    static #toggleVisibilityListener(e) {
        e.target.nextElementSibling.classList.toggle("visible");
    }

    static #buildDropdownListing(listing, ulClasses) {
        return htmlMixin.createListingComponent(listing, ulClasses);
    }
}
