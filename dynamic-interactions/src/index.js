import "./stylesheets/minimum.css";
import "./stylesheets/style.css";
import imageGlobe from "./images/globe.jpg";
import Dropdown from "./javascript/dropdown";
import DropdownView from "./javascript/dropdownView";
import dataMenuItems from "./javascript/data";

const main = (() => {
    const globeImage = new Image(500, 500);
    globeImage.src = imageGlobe;

    const mainElement = document.querySelector("main");
    mainElement.appendChild(globeImage);

    const navElement = document.querySelector("nav");
    navElement.classList.add("red");

    navElement
        .querySelector(".user-menu-button")
        .addEventListener("click", () => {
            document.querySelector("nav ul").classList.toggle("visible");
        });

    window.addEventListener("click", (event) => {
        if (!event.target.classList.contains("user-menu-button")) {
            document.querySelector("nav ul").classList.remove("visible");
        }
    });

    const menuDropdown = new Dropdown("Prompt", dataMenuItems);
    const dropdownView = new DropdownView(menuDropdown);

    console.log(dropdownView.displayView());

    return {};
})();
