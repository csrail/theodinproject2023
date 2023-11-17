import "./stylesheets/minimum.css";
import "./stylesheets/style.css";
import { dataMenuItems1, dataMenuItems2 } from "./data/data";
import DropdownController from "./javascript/dropdownController";

(() => {
    const headerElement = document.querySelector("header");

    const dropdownController1 = new DropdownController(dataMenuItems1);
    headerElement.appendChild(dropdownController1.displayView());

    const dropdownController2 = new DropdownController(dataMenuItems2);
    headerElement.appendChild(dropdownController2.displayView());

    return {};
})();
