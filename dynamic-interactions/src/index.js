import "./style.css";
import imageGlobe from "./images/globe.jpg";

const globeImage = new Image(500, 500);
globeImage.src = imageGlobe;

const mainElement = document.querySelector("main");
mainElement.appendChild(globeImage);

const navElement = document.querySelector("nav");
navElement.classList.add("red");
navElement.addEventListener("click", () => {
    console.log("test");
    document.querySelectorAll("nav li").forEach((element) => {
        element.classList.add("visible");
    });
});

// window.addEventListener("click", () => {
//     document.querySelectorAll(".visible").forEach((element) => {
//         element.classList.remove("visible");
//     });
// });
