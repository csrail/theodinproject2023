export default class Dropdown {
    constructor(dropdownTitle, dropdownListing) {
        this.dropdownTitle = dropdownTitle;
        this.listing = dropdownListing;
    }

    getDropdownTitle() {
        return this.dropdownTitle;
    }

    getDropdownListing() {
        return Object.entries(this.listing);
    }
}
