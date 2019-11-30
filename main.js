import { Puzzle } from "./Puzzle.js";
import { loadImage } from "./utils.js";

const newImage = src => {
  const width = document.getElementById("width").value;
  const height = document.getElementById("height").value;

  const canvas = document.getElementById("canvas");
  const image = document.getElementById("preview");
  loadImage(image, src, Math.min(window.innerWidth, 500))
    .then(() => {
      new Puzzle(canvas, image, width, height).init();
    })
    .catch(console.error);
};

window.addEventListener("load", () => {
  newImage("img/doggo1.jpg");

  document.querySelectorAll("button").forEach((button, i) => {
    button.addEventListener("click", () => newImage(`img/doggo${i + 1}.jpg`));
  });
});
