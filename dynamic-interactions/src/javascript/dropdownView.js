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
        const component = document.createDocumentFragment();

        component.appendChild(this.buildDropdownTitle());
        component.appendChild(this.buildDropdownListing());

        return component;
    }

    buildDropdownTitle() {
        const component = htmlMixin.createButtonElement(
            this.#dropdownObject.dropdownTitle,
        );

        component.addEventListener("click", (e) => {
            e.target.classList.toggle("visible");
        });

        return component;
    }

    buildDropdownListing() {
        return htmlMixin.createListingComponent(
            this.#dropdownObject.dropdownListing,
        );
    }
}
