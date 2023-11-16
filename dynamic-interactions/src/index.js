import "./stylesheets/minimum.css";
import "./stylesheets/style.css";
import imageGlobe from "./images/globe.jpg";
import Dropdown from "./javascript/dropdownModel";
import DropdownView from "./javascript/dropdownView";
import dataMenuItems from "./data/data";

const main = (() => {
    // const globeImage = new Image(500, 500);
    // globeImage.src = imageGlobe;
    //
    // const mainElement = document.querySelector("main");
    // mainElement.appendChild(globeImage);
    //
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
