import "./stylesheets/minimum.css";
import "./stylesheets/style.css";
import Dropdown from "./javascript/dropdownModel";
import DropdownView from "./javascript/dropdownView";
import dataMenuItems from "./data/data";
import DropdownController from "./javascript/dropdownController";

(() => {
    const headerElement = document.querySelector("header");
    const navElement = document.querySelector("nav");

    navElement
        .querySelector(".menu-dropdown-button")
        .addEventListener("click", () => {
            document.querySelector("nav ul").classList.toggle("visible");
        });

    window.addEventListener("click", (event) => {
        if (!event.target.classList.contains("menu-dropdown-button")) {
            document.querySelector("nav ul").classList.remove("visible");
        }
    });

    const dropdownController = new DropdownController(dataMenuItems);
    headerElement.appendChild(dropdownController.displayView());

    return {};
})();
