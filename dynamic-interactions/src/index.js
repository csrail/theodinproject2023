import "./minimum.css";
import "./style.css";
import imageGlobe from "./images/globe.jpg";

const globeImage = new Image(500, 500);
globeImage.src = imageGlobe;

const mainElement = document.querySelector("main");
mainElement.appendChild(globeImage);

const navElement = document.querySelector("nav");
navElement.classList.add("red");

navElement.querySelector(".user-menu-button").addEventListener("click", () => {
    document.querySelector("nav ul").classList.toggle("visible");
});

window.addEventListener("click", (event) => {
    if (!event.target.classList.contains("user-menu-button")) {
        document.querySelector("nav ul").classList.remove("visible");
    }
});
