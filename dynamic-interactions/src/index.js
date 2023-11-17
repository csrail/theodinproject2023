import "./stylesheets/minimum.css";
import "./stylesheets/style.css";
import Dropdown from "./javascript/dropdownModel";
import DropdownView from "./javascript/dropdownView";
import dataMenuItems from "./data/data";

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

    const menuDropdown = new Dropdown(dataMenuItems);
    const dropdownView = new DropdownView(menuDropdown);

    headerElement.appendChild(dropdownView.displayView());

    return {};
})();
