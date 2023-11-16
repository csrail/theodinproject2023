export default class Dropdown {
    #dropdownProperties;

    constructor(properties) {
        this.#dropdownProperties = properties;
    }

    get dropdownTitle() {
        return this.#dropdownProperties.title;
    }

    get dropdownListing() {
        return this.#dropdownProperties.listing;
    }

    get buttonClasses() {
        return this.#dropdownProperties.buttonClass;
    }

    get ulClasses() {
        return this.#dropdownProperties.ulClass;
    }
}
