export default class Dropdown {
    #dropdownTitle;

    #dropdownProperties;

    constructor(title, properties) {
        this.#dropdownTitle = title;
        this.#dropdownProperties = properties;
    }

    get dropdownTitle() {
        return this.#dropdownTitle;
    }

    get dropdownListing() {
        return this.#dropdownProperties.listing;
    }
}
