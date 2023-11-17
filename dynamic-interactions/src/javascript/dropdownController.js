import Dropdown from "./dropdownModel";
import DropdownView from "./dropdownView";

class DropdownController {
    #dropdownObject;

    constructor(dropdownData) {
        this.#dropdownObject = new Dropdown(dropdownData);
    }

    #buildView() {
        return new DropdownView(this.#dropdownObject);
    }

    displayView() {
        return this.#buildView().displayView();
    }
}

export default DropdownController;
