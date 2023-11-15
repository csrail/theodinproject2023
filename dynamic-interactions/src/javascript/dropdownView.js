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
            DropdownView.#buildDropdownTitle(
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

    static #buildDropdownTitle(title) {
        const component = htmlMixin.createButtonElement(title);

        component.addEventListener("click", (e) => {
            e.target.classList.toggle("visible");
        });

        return component;
    }

    static #buildDropdownListing(listing, ulClasses) {
        return htmlMixin.createListingComponent(listing, ulClasses);
    }
}
