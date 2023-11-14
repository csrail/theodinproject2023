export default class Dropdown {
    #dropdownTitle;

    #dropdownListing;

    constructor(title, listing) {
        this.#dropdownTitle = title;
        this.#dropdownListing = listing;
    }

    get dropdownTitle() {
        return this.#dropdownTitle;
    }

    get dropdownListing() {
        return this.#dropdownListing;
    }
}
