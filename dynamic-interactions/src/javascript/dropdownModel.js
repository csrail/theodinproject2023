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
}
