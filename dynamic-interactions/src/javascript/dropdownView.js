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

        return component;
    }

    buildDropdownTitle() {
        return htmlMixin.createButtonElement(
            this.dropdownObject.getDropdownTitle(),
        );
    }

    buildDropdownListing() {}
}
