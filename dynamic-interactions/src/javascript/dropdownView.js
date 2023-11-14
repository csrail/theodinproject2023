import htmlMixin from "./htmlMixin";

export default class DropdownView {
    constructor(dropdownObject) {
        this.dropdownObject = dropdownObject;
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
        return htmlMixin.createButtonElement(this.dropdownObject.dropdownTitle);
    }

    buildDropdownListing() {
        return htmlMixin.createListingComponent(
            this.dropdownObject.dropdownListing,
        );
    }
}
